import classNames from 'classnames';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './resource-detail.module.scss';

export interface ResourceDetailProps {
  title: JSX.Element | string;
  publishedDate?: JSX.Element | string;
  author?: string[];
  leadContent?: JSX.Element | string;
  mainContent?: JSX.Element | string;
  image?: JSX.Element;
  imageCaption?: JSX.Element | string;
  imageRightAligned?: boolean;
}

export default function ResourceDetail({
  title,
  publishedDate,
  author,
  leadContent,
  mainContent,
  image,
  imageCaption,
  imageRightAligned = true,
}: ResourceDetailProps): JSX.Element {
  return (
    <Container>
      <Row>
        <Col sm={12} lg={8} className={classNames(styles.wrapper, 'offset-lg-2')}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.info}>
            {author?.length != undefined && author.length > 0 && (
              <span className={styles.author}>By {author}, </span>
            )}
            {publishedDate && <span className={styles.publishedDate}>{publishedDate}</span>}
          </div>
          {image && (
            <figure
              className={classNames(styles.imageBox, imageRightAligned ? styles.imageRight : '')}
            >
              {image}
              {imageCaption && (
                <figcaption className={styles.imageCaption}>{imageCaption}</figcaption>
              )}
            </figure>
          )}
          <div className={styles.leadContent}>{leadContent}</div>
          <div className={styles.mainContent}>{mainContent}</div>
        </Col>
      </Row>
    </Container>
  );
}
