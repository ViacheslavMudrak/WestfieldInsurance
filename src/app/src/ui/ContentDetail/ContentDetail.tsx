import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import ContentDetailNav, { NavigationProps } from './ContentDetailNav';
import styles from './content-detail.module.scss';

export interface ContentDetailProps {
  label?: JSX.Element | string;
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  mainContent?: JSX.Element | string;
  image?: JSX.Element;
  imageCaption?: JSX.Element | string;
  isEditing?: boolean;
  hasNavigation?: boolean;
  navigation?: NavigationProps;
  children?:
    | React.ReactElement<typeof Placeholder>
    | JSX.Element
    | React.ReactElement<typeof Placeholder>[];
}

export default function ContentDetail({
  label,
  title,
  subtitle,
  mainContent,
  image,
  imageCaption,
  isEditing,
  navigation,
  hasNavigation,
  children,
}: ContentDetailProps): JSX.Element {
  const showNav = hasNavigation;

  return (
    <Container>
      <Row>
        {showNav || isEditing ? (
          <Col size={12} sm={12} md={3} className={styles.navWrapper}>
            <ContentDetailNav {...navigation} />
            {children && children[0]}
          </Col>
        ) : (
          <></>
        )}
        <Col
          size={12}
          sm={12}
          md={hasNavigation ? 9 : 12}
          lg={9}
          className={classNames(styles.wrapper, hasNavigation ? '' : styles.wrapperOffset)}
        >
          {label && (
            <div className={classNames(styles.label, isEditing ? 'pages-label' : '')}>{label}</div>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          {image && (
            <figure className={classNames(styles.imageBox)}>
              {image}
              {imageCaption && (
                <figcaption className={styles.imageCaption}>{imageCaption}</figcaption>
              )}
            </figure>
          )}
          <div className={styles.mainContent}>{mainContent}</div>
          <>{children && children[1]}</>
        </Col>
      </Row>
    </Container>
  );
}
