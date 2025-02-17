/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentRendering,
  Field,
  GetStaticComponentProps,
  RichText,
  Text,
  useComponentProps,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HeroBanner, { HeroBannerPropsUi } from 'src/ui/HeroBanner/HeroBanner';
import AnchorComponent from './AnchorComponent';
import NextImageExtended from 'components/Helpers/NextImageExtended';
import Cta from 'components/Helpers/Cta';
import { ButtonVariants, ComponentTheme } from 'src/types/generic';
import {
  GetAgentSearch,
  GetDictionaryPhrase,
  GetItemId,
  GetStyle,
  HasStyle,
  IsEditing,
} from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { FindAnAgentForm } from 'src/repository/findAnAgent/types';
import { MapInsuranceOptions } from 'src/repository/findAnAgent/functions';
import { initRequestClient } from 'lib/graphql/requestClient';
import { heroBannerGql } from 'src/repository/heroBanner/graphql';

interface DataFields {
  data: {
    findAnAgentForm: FindAnAgentForm;
  };
}

interface Fields {
  Title: Field<string>;
  RichTextCopy: Field<string>;
  Link: LinkField;
  Image: ImageField;
  ImageCaption: Field<string>;
}

type HeroBannerProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const HeroBannerDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Hero Banner</span>
);

const HeroBannerMarkup = (props: HeroBannerProps, agentSearch: boolean): JSX.Element => {
  const componentProps = props.rendering.uid
    ? useComponentProps<DataFields>(props.rendering.uid)
    : undefined;

  const datasource = props.fields;
  const zipErrorText = GetDictionaryPhrase('invalid-zip');
  const missingZipText = GetDictionaryPhrase('missing-zip');
  const agentSearchButtonText = GetDictionaryPhrase('agent-search-button');
  const insuranceTypeLabel = GetDictionaryPhrase('insurance-type');
  const zipCodeLabel = GetDictionaryPhrase('zip-code');

  if (datasource && componentProps?.data) {
    const findAnAgentForm = componentProps?.data.findAnAgentForm;

    const heroBannerProps: HeroBannerPropsUi = {
      isEditing: IsEditing(),
      title: <Text field={datasource.Title} />,
      richTextCopy: <RichText field={datasource.RichTextCopy} />,
      image:
        (datasource.Image.value &&
          datasource.Image.value.class &&
          datasource.Image.value.class == 'scEmptyImage') ||
        IsEditing() ? (
          <>
            {/* styling for Sitecore Pages editor */}
            <span style={{ backgroundColor: 'white', color: 'black', zIndex: 1000 }}>
              Edit Hero Image:
              <NextImageExtended field={datasource.Image} />
            </span>
          </>
        ) : (
          <NextImageExtended field={datasource.Image} />
        ),
      link: (
        <Cta
          link={props.fields.Link}
          style={
            GetStyle(
              props.params && props.params.Styles ? props.params.Styles : '',
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
      ),
      overlay: HasStyle(
        props.params && props.params.Styles ? props.params.Styles : '',
        'overlay-present'
      ),
      agentSearch: agentSearch,
      agentSearchProps: {
        title: <Text field={findAnAgentForm?.title?.jsonValue} />,
        onSubmitForm: GetAgentSearch(findAnAgentForm),
        insuranceOptions: MapInsuranceOptions(
          findAnAgentForm?.insuranceTypes?.targetItem.children.results
        ),
        zipErrorText: zipErrorText,
        missingZipText: missingZipText,
        agentSearchButtonText: agentSearchButtonText,
        insuranceTypeLabel: insuranceTypeLabel,
        zipCodeLabel: zipCodeLabel,
      },
      theme: GetStyle(
        props.params && props.params.Styles ? props.params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
    };
    return (
      <AnchorComponent anchorId={props.params?.RenderingIdentifier}>
        <HeroBanner {...heroBannerProps} />
      </AnchorComponent>
    );
  }

  return <HeroBannerDefaultComponent />;
};

export const getStaticProps: GetStaticComponentProps = async (rendering, _layoutData, context) => {
  const graphQlClient = initRequestClient();
  const findAnAgentFormId = GetItemId(_layoutData.sitecore.context.site?.name, 'FindAnAgentId');

  return {
    data: await graphQlClient.request(heroBannerGql, {
      itemId: rendering.dataSource,
      lang: context.locale,
      findAnAgentFormId: findAnAgentFormId,
    }),
  };
};

export const Default = (props: HeroBannerProps): JSX.Element => {
  return HeroBannerMarkup(props, true);
};

export const RemoveAgentSearch = (props: HeroBannerProps): JSX.Element => {
  return HeroBannerMarkup(props, false);
};
