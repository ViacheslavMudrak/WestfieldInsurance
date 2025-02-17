import CareerListings, { CareerListingProps } from 'src/ui/CareerListing/CareerListing';
import AnchorComponent from './AnchorComponent';
import { CareerListing } from 'src/repository/CareerListings/types';
import { MapCareerListings } from 'src/repository/CareerListings/functions';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { LinkJson, StringJson } from 'src/repository/shared/types';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Cta from 'components/Helpers/Cta';
import { repositoryConstants } from 'src/repository/constants';
import { ButtonVariants } from 'src/types/generic';

interface Fields {
  data: {
    datasource: {
      title: StringJson;
      label: StringJson;
      copy: StringJson;
      ctaLink: LinkJson;
      careerListings: {
        results: CareerListing[];
      };
    };
  };
}

type CareerListingsPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const CareerListingsDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Career Listings</span>
);

const CareerListingsMarkup = (
  { fields, params }: CareerListingsPropsBed,
  reverse: boolean
): JSX.Element => {
  const datasource = fields?.data?.datasource;
  if (datasource) {
    const careerListingsProps: CareerListingProps = {
      reverse: reverse,
      title: <Text field={fields.data.datasource.title.jsonValue} />,
      label: <Text field={fields.data.datasource.label.jsonValue} />,
      content: <Text field={fields.data.datasource.copy.jsonValue} />,
      link: (
        <Cta
          link={fields.data.datasource.ctaLink.jsonValue}
          style={
            GetStyle(
              params?.Styles,
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
      ),
      listItems: MapCareerListings(datasource.careerListings.results, IsEditing()),
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <CareerListings {...careerListingsProps} />
      </AnchorComponent>
    );
  }

  return <CareerListingsDefaultComponent />;
};

export const Default = (props: CareerListingsPropsBed): JSX.Element => {
  return CareerListingsMarkup(props, false);
};

export const CareerLeft = (props: CareerListingsPropsBed): JSX.Element => {
  return CareerListingsMarkup(props, true);
};
