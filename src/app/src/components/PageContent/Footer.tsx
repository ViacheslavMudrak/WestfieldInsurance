import {
  ComponentRendering,
  GetStaticComponentProps,
  Link,
  LinkFieldValue,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import { useI18n } from 'next-localization';
import EmailIcon from 'src/assets/icons/email.svg';
import LocationIcon from 'src/assets/icons/location.svg';
import PhoneIcon from 'src/assets/icons/phone.svg';
import { fetchFooterData$, footerItemKey } from 'src/repository/footer/fetch';
import {
  FooterAddressItemResultsList,
  FooterRelevantText,
  MultiListTargetItems,
  ResultsFieldLink,
  SocialMediaContent,
} from 'src/repository/footer/types';
import { MapInsuranceOptions } from 'src/repository/findAnAgent/functions';
import { Category } from 'src/types/category';
import { FooterContentType } from 'src/types/footer';
import Footer, { FooterPropsUi } from 'src/ui/Footer/Footer';
import {
  GetAgentSearch,
  GetDictionaryPhrase,
  GetItemId,
  GetSiteName,
} from 'components/Helpers/ContentUtil';

type FooterProps = {
  rendering: ComponentRendering;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const FooterMarkup = ({ rendering }: FooterProps): JSX.Element => {
  const { locale } = useI18n();
  const lang = locale();

  const footerDataQuery = useQuery({
    queryKey: [
      footerItemKey,
      rendering.dataSource,
      lang,
      GetItemId(GetSiteName(), 'FindAnAgentId'),
    ],
    queryFn: fetchFooterData$,
    enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const FooterDefaultComponent = (): JSX.Element => <span className="is-empty-hint">Footer</span>;

  const zipErrorText = GetDictionaryPhrase('invalid-zip');
  const missingZipText = GetDictionaryPhrase('missing-zip');
  const agentSearchButtonText = GetDictionaryPhrase('agent-search-button');
  const insuranceTypeLabel = GetDictionaryPhrase('insurance-type');
  const zipCodeLabel = GetDictionaryPhrase('zip-code');

  if (footerDataQuery.data?.item) {
    const footerProps: FooterPropsUi = {
      logo: <NextImageExtended field={footerDataQuery.data.item.image?.jsonValue} />,
      legalDisclaimer: <Text field={footerDataQuery.data.item.legalDisclaimer.jsonValue} />,
      agentSearchProps: {
        title: footerDataQuery.data.findAnAgentForm?.title?.jsonValue.value,
        onSubmitForm: GetAgentSearch(footerDataQuery.data.findAnAgentForm),
        insuranceOptions: MapInsuranceOptions(
          footerDataQuery.data.findAnAgentForm?.insuranceTypes?.targetItem.children.results
        ),
        zipErrorText: zipErrorText,
        missingZipText: missingZipText,
        agentSearchButtonText: agentSearchButtonText,
        insuranceTypeLabel: insuranceTypeLabel,
        zipCodeLabel: zipCodeLabel,
      },
      links: getRelevantLinks(
        footerDataQuery.data?.item.footerRelevantTexts.targetItems,
        footerDataQuery.data?.item.footerRelevantLinks.targetItems
      ),
      navigation: getNavigationCategories(
        footerDataQuery.data?.item.footerNavigationGroups.targetItems
      ),
      socialData: GetSocialComponents(
        footerDataQuery.data?.item.footerSocialMediaLinks.targetItems
      ),
      contactData: getContactsComponent(
        footerDataQuery.data?.item.email,
        footerDataQuery.data?.item.phoneNo
      ),
      locationData: getLocationComponent(footerDataQuery.data?.item.addresses.targetItems),
    };
    return <Footer {...footerProps} />;
  }

  return <FooterDefaultComponent />;
};

export const getStaticProps: GetStaticComponentProps = async (rendering, _layoutData, context) => {
  //get footer data and footer address data info from cache or gql. store in cache
  await queryClient.fetchQuery(
    [
      footerItemKey,
      rendering.dataSource,
      context.locale,
      GetItemId(_layoutData.sitecore.context.site?.name, 'FindAnAgentId'),
    ],
    fetchFooterData$,
    { staleTime: 600000 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const Default = (props: FooterProps): JSX.Element => {
  return FooterMarkup(props);
};

function GetSocialComponents(links: SocialMediaContent[] | undefined): JSX.Element[] {
  const resultToMap: JSX.Element[] = [];
  if (links) {
    links.forEach((link) => {
      if (link.name) {
        resultToMap.push(
          <Link field={link.link} key={link.id}>
            <NextImageExtended field={link.image?.jsonValue} />
          </Link>
        );
      }
    });
  }
  return resultToMap;
}

function getContactsComponent(email: LinkFieldValue, phone: LinkFieldValue) {
  return [
    <>
      <PhoneIcon />
      <Link field={phone} />
    </>,
    <>
      <EmailIcon />
      <Link field={email} />
    </>,
  ];
}

function getLocationComponent(addresses: FooterAddressItemResultsList): JSX.Element[] {
  const addressList: JSX.Element[] = [];
  addresses.map((address) => {
    addressList.push(
      <>
        <p>
          <LocationIcon /> <a href={address.mapsLink.url}>{address.addressTitle.value}</a>
        </p>
        <p>{address.addressLine1.value}</p>
        <p>{address.addressLine2.value}</p>
        <p>
          {address.city.value}
          {address.stateOrProvince.value ? ', ' + address.stateOrProvince.value : ''}
          {address.country.value ? ', ' + address.country.value : ''}
          {' ' + address.postalCode.value}
        </p>
      </>
    );
  });
  return addressList;
}

function getNavigationCategories(navigationGroups: MultiListTargetItems[] | undefined): Category[] {
  const resultToMap: Category[] = [];
  if (navigationGroups) {
    navigationGroups.map((group) => {
      resultToMap.push({
        title: group.name,
        links: group.children.results.map((result) => {
          return { id: result.id, field: result.linkField };
        }),
        id: group.id,
      });
    });
  }
  return resultToMap;
}

function getRelevantLinks(
  texts: FooterRelevantText[] | undefined,
  links: ResultsFieldLink[] | undefined
): FooterContentType[] {
  const resultToMap: FooterContentType[] = [];
  if (texts) {
    texts.map((text) => {
      if (text.title.value) {
        resultToMap.push({
          content: { text: text.title.value, id: text.id },
          type: 'text',
          id: text.id,
        });
      }
    });
  }
  if (links) {
    links.map((link) => {
      resultToMap.push({
        content: { field: link.linkField, id: link.id },
        type: 'link',
        id: link.id,
      });
    });
  }
  return resultToMap;
}
