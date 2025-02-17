import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './banner.module.scss';

export interface BannerProps {
  image?: JSX.Element;
  title: string;
  subtitle?: JSX.Element | string;
}

export default function Banner({ image, title, subtitle }: BannerProps): JSX.Element {
  return (
    <div className={styles.banner}>
      <div className={styles.image}>{image}</div>
      <Container>
        <Row>
          <Col lg="6">
            <div className={styles.inner}>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
