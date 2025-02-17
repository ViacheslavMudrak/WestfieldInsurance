/* eslint-disable react-hooks/rules-of-hooks */
import {
  ComponentRendering,
  Field,
  GetStaticComponentProps,
  RichText,
  Text,
  useComponentProps,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import InteriorHeroBanner, {
  InteriorHeroBannerPropsUi,
} from 'src/ui/InteriorHeroBanner/InteriorHeroBanner';
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
} from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { IsEditing } from 'components/Helpers/ContentUtil';
import { FindAnAgentForm } from 'src/repository/findAnAgent/types';
import { MapInsuranceOptions } from 'src/repository/findAnAgent/functions';
import { initRequestClient } from 'lib/graphql/requestClient';
import { interiorHeroBannerGql } from 'src/repository/interiorHeroBanner/graphql';

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

type InteriorHeroBannerProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const InteriorHeroBannerDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Interior Hero Banner</span>
);

const InteriorHeroBannerMarkup = (
  props: InteriorHeroBannerProps,
  agentSearch: boolean
): JSX.Element => {
  const componentProps = props.rendering.uid
    ? useComponentProps<DataFields>(props.rendering.uid)
    : undefined;

  const datasource = props.fields;
  const zipErrorText = GetDictionaryPhrase('invalid-zip');
  const missingZipText = GetDictionaryPhrase('missing-zip');
  const agentSearchButtonText = GetDictionaryPhrase('agent-search-button');
  const insuranceTypeLabel = GetDictionaryPhrase('insurance-type');
  const zipCodeLabel = GetDictionaryPhrase('zip-code');

  if (componentProps?.data && datasource) {
    const findAnAgentForm = componentProps.data.findAnAgentForm;

    const interiorHeroBannerProps: InteriorHeroBannerPropsUi = {
      title: <Text field={datasource.Title} />,
      richTextCopy: <RichText field={datasource.RichTextCopy} />,
      image:
        datasource.Image.value &&
        datasource.Image.value.class &&
        datasource.Image.value.class == 'scEmptyImage' ? (
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
          link={datasource.Link}
          style={
            GetStyle(
              props.params && props.params.Styles ? props.params.Styles : '',
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
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
      overflowTheme: GetStyle(
        props.params && props.params.Styles ? props.params.Styles : '',
        repositoryConstants.styles.overflowThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      agentSearchTheme: GetStyle(
        props.params && props.params.Styles ? props.params.Styles : '',
        repositoryConstants.styles.agentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      imageBottom: HasStyle(
        props.params && props.params.Styles ? props.params.Styles : '',
        'image-bottom'
      ),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={props.params?.RenderingIdentifier}>
        <InteriorHeroBanner {...interiorHeroBannerProps} />
      </AnchorComponent>
    );
  }

  return <InteriorHeroBannerDefaultComponent />;
};

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData, context) => {
  const graphQlClient = initRequestClient();
  const findAnAgentFormId = GetItemId(layoutData.sitecore.context.site?.name, 'FindAnAgentId');

  return {
    data: await graphQlClient.request(interiorHeroBannerGql, {
      itemId: rendering.dataSource,
      lang: context.locale,
      findAnAgentFormId: findAnAgentFormId,
    }),
  };
};

export const Default = (props: InteriorHeroBannerProps): JSX.Element => {
  return InteriorHeroBannerMarkup(props, true);
};

export const RemoveAgentSearch = (props: InteriorHeroBannerProps): JSX.Element => {
  return InteriorHeroBannerMarkup(props, false);
};
