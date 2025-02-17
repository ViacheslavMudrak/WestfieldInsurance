import styles from './footer-location.module.scss';

export interface FooterLocationProps {
  location: JSX.Element;
}

export default function FooterLocation(props: FooterLocationProps): JSX.Element {
  const { location } = props;
  return <div className={styles.location}>{location}</div>;
}
