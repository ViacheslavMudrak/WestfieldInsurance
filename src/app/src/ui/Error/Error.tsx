import classNames from 'classnames';
import useIsTablet from 'src/hooks/useIsTablet';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './error.module.scss';
import Search from '../Search/Search';

export interface ErrorProps {
  title?: string | JSX.Element;
  richTextCopy?: string | JSX.Element;
  link?: string | JSX.Element;
  image?: JSX.Element;
  accessToken?: string;
  orgId?: string;
}

export default function Error({
  title,
  richTextCopy,
  link,
  image,
  accessToken,
  orgId,
}: ErrorProps): JSX.Element {
  const isTablet = useIsTablet();

  return (
    <Container className={styles.error}>
      <Row>
        <Col>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <h1 className={styles.title}>{title}</h1>
              <div className={classNames(styles.richText, 'rich-text')}>{richTextCopy}</div>
              <Search
                className={styles.mobileMenuSearch}
                accessToken={accessToken}
                organizationId={orgId}
              />
              {link}
            </div>
          </div>
          {isTablet ? <div className={styles.imageWrapper}>{image}</div> : null}
        </Col>
      </Row>
    </Container>
  );
}
