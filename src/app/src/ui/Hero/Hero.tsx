import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './hero.module.scss';

export interface HeroProps {
  title: string;
  content: JSX.Element | string;
  link: JSX.Element;
  image: JSX.Element;
}

export default function Hero({ title, content, link, image }: HeroProps): JSX.Element {
  return (
    <div className={styles.hero}>
      <div className={styles.image}>{image}</div>
      <Container>
        <Row>
          <Col lg="4">
            <div className={styles.inner}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.content}>{content}</div>
              <div className={styles.cta}>{link}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
