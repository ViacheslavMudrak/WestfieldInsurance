import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import RichTextWrapper, { RichTextStyles } from 'src/ui/RichText/RichTextWrapper';
import { GetStyle, IsEditing } from 'components/Helpers/ContentUtil';
import { repositoryConstants } from 'src/repository/constants';
import { AdditionalPaddingStyles, ComponentTheme } from 'src/types/generic';
import AnchorComponent from './AnchorComponent';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const CustomRichTextMarkup = (props: RichTextProps, hasContainer: boolean): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Custom Rich text</span>
  );

  return (
    <AnchorComponent anchorId={props.params?.RenderingIdentifier}>
      <RichTextWrapper
        isEditing={IsEditing()}
        hasContainer={hasContainer}
        theme={
          GetStyle(
            props.params && props.params.Styles ? props.params.Styles : '',
            repositoryConstants.styles.componentThemeName,
            repositoryConstants.styles.lightThemeDefault
          ) as ComponentTheme
        }
        style={
          GetStyle(
            props.params?.Styles,
            repositoryConstants.styles.richTextStyleName,
            repositoryConstants.styles.richTextDefaultStyle
          ) as RichTextStyles
        }
        paddingStyle={
          GetStyle(
            props.params?.Styles,
            repositoryConstants.styles.additionalPaddingStyleName,
            ''
          ) as AdditionalPaddingStyles
        }
        className={IsEditing() ? 'pages-richtext' : ''}
      >
        {text}
      </RichTextWrapper>
    </AnchorComponent>
  );
};

export const Default = (props: RichTextProps): JSX.Element => {
  return CustomRichTextMarkup(props, true);
};

export const NoContainer = (props: RichTextProps): JSX.Element => {
  return CustomRichTextMarkup(props, false);
};
