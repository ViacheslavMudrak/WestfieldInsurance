import { Field, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Cta from 'components/Helpers/Cta';
import FullwidthWidget, { FullwidthWidgetProps } from 'src/ui/FullwidthWidget/FullwidthWidget';
import AnchorComponent from './AnchorComponent';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { ButtonVariants, ComponentTheme } from 'src/types/generic';
import { repositoryConstants } from 'src/repository/constants';

interface Fields {
  Title: Field<string>;
  Copy: Field<string>;
  Label: Field<string>;
  CtaLink: LinkField;
}

type FullWidthWidgetProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FullWidthWidgetDefaultComponent = (): JSX.Element => (
  <span className="is-empty-hint">Full Width Widget</span>
);

const FullWidthWidgetMarkup = ({ params, fields }: FullWidthWidgetProps): JSX.Element => {
  if (fields) {
    const fullWidthWidgetProps: FullwidthWidgetProps = {
      title: <Text field={fields.Title} />,
      content: <Text field={fields.Copy} />,
      label: <Text field={fields.Label} />,
      link: (
        <Cta
          link={fields.CtaLink}
          style={
            GetStyle(
              params?.Styles,
              repositoryConstants.styles.ctaStyleName,
              repositoryConstants.styles.ctaDefaultStyle
            ) as ButtonVariants
          }
        />
      ),
      theme: GetStyle(
        params && params.Styles ? params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      isEditing: IsEditing(),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <FullwidthWidget {...fullWidthWidgetProps} />
      </AnchorComponent>
    );
  }

  return <FullWidthWidgetDefaultComponent />;
};

export const Default = (props: FullWidthWidgetProps): JSX.Element => {
  return FullWidthWidgetMarkup(props);
};
