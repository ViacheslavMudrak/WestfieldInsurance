import classNames from 'classnames';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './list-banner.module.scss';

export interface ListBannerProps {
  title?: JSX.Element | string;
  richText?: JSX.Element | string;
  image?: JSX.Element;
  invert?: boolean;
  link?: JSX.Element | string;
  isEditing?: boolean;
}

export default function ListBanner({
  title,
  richText,
  image,
  invert,
  link,
  isEditing,
}: ListBannerProps) {
  return (
    <Container
      className={classNames(
        styles.listBanner,
        invert ? styles.invert : null,
        isEditing ? 'component' : ''
      )}
    >
      <Row>
        <Col size={12} md={6} lg={8} className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.richText}>{richText}</div>
          <div className={styles.inner}>{link && <div>{link}</div>}</div>
        </Col>
        <Col size={12} md={6} lg={4} className={styles.imageWrapper}>
          <div className={styles.image}>{image}</div>
        </Col>
      </Row>
    </Container>
  );
}
