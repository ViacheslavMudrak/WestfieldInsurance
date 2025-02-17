import classNames from 'classnames';
import styles from './rich-text-wrapper.module.scss';
import { AdditionalPaddingStyles, ComponentTheme } from 'src/types/generic';

export interface RichTextProps {
  children: JSX.Element | string;
  className?: string;
  style: RichTextStyles;
  theme?: ComponentTheme;
  paddingStyle?: AdditionalPaddingStyles;
  hasContainer?: boolean;
  isEditing?: boolean;
}

export enum RichTextStyles {
  Block = 'blockquote',
  Pull = 'pullquote',
  Empty = '',
  Disclaimer = 'disclaimer',
}

export default function RichTextWrapper({
  children,
  className,
  style,
  theme,
  paddingStyle,
  hasContainer,
  isEditing,
}: RichTextProps): JSX.Element {
  const isDarkTheme = theme === ComponentTheme.Dark;
  const paddingClassName =
    paddingStyle === AdditionalPaddingStyles.PaddingTop
      ? styles.paddingTop
      : paddingStyle === AdditionalPaddingStyles.NoPadding
      ? styles.noPadding
      : paddingStyle === AdditionalPaddingStyles.PaddingBottom
      ? styles.paddingBottom
      : styles.paddingTopBottom;

  if (style == RichTextStyles.Pull || style == RichTextStyles.Block) {
    return (
      <div
        className={classNames(isDarkTheme ? styles.darkTheme : '', isEditing ? 'component' : '')}
      >
        <div className={classNames(hasContainer ? 'container' : '', 'rich-text', paddingClassName)}>
          <blockquote className={classNames(styles.quote, className, styles[style])}>
            {children}
          </blockquote>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={classNames(isDarkTheme ? styles.darkTheme : '', isEditing ? 'component' : '')}
      >
        <div
          className={classNames(
            style == RichTextStyles.Empty || RichTextStyles.Disclaimer ? '' : styles.quote,
            isEditing && style == RichTextStyles.Empty ? 'pages-empty' : '',
            className,
            styles[style],
            hasContainer ? 'container' : '',
            'rich-text',
            paddingClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
}
