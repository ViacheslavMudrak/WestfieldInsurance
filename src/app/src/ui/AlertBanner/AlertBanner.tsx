import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import CloseIcon from 'src/assets/icons/circle-close.svg';
import { ComponentTheme, SiteLink } from 'src/types/generic';
import styles from './alert-banner.module.scss';

export interface AlertBannerProps {
  bgColor?: string;
  icon?: JSX.Element;
  content: JSX.Element | string;
  link?: SiteLink;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  theme?: ComponentTheme;
  isEditing?: boolean;
  closeBannerText?: string;
}

export default function AlertBanner(props: AlertBannerProps): JSX.Element {
  const componentTheme =
    props.theme === ComponentTheme.Dark
      ? styles.dark
      : props.theme === ComponentTheme.Light
      ? styles.light
      : '';

  return (
    <div
      className={classNames(
        styles.wrapper,
        componentTheme,
        props.isEditing ? 'component pages-alert-banner' : ''
      )}
    >
      <div className={styles.inner}>
        {props.icon && <span className={styles.icon}>{props.icon}</span>}
        {props.content}
        {props.link && <Link field={props.link.field} className={styles.link} />}
      </div>
      <button className={styles.close} onClick={props.onClose}>
        <span className="sr-only">{props.closeBannerText}</span>
        <CloseIcon />
      </button>
    </div>
  );
}
