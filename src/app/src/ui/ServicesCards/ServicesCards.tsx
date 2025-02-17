import classNames from 'classnames';
import Image from 'next/image';
import { ComponentTheme } from 'src/types/generic';
import Container from 'src/ui//Grid/Container';
import Row from 'src/ui//Grid/Row';
import Col from 'src/ui/Grid/Col';
import ServiceCard, { ServicesCard } from './ServicesCard';
import styles from './services-cards.module.scss';

export interface ServicesCardsProps {
  label?: JSX.Element | string;
  title?: JSX.Element | string;
  cards?: ServicesCard[];
  theme?: ComponentTheme;
  isEditing?: boolean;
}

export default function ServicesCards(props: ServicesCardsProps): JSX.Element {
  const { cards, title, label, isEditing = false, theme = ComponentTheme.Accent } = props;
  const themeStyles = theme ? styles[theme] : null;

  return (
    <section
      className={classNames(
        styles.servicesCards,
        themeStyles,
        isEditing ? 'component pages-services-cards' : '',
        isEditing && theme === ComponentTheme.Accent ? 'accent-theme' : ''
      )}
    >
      <div className={styles.headingWrapper}>
        <Container>
          <Row>
            <Col>
              <div className={styles.heading}>
                <span className={classNames(styles.label, isEditing ? 'pages-label' : '')}>
                  {label}
                </span>
                <h2 className={classNames(styles.title, isEditing ? 'pages-title' : '')}>
                  {title}
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={classNames(styles.accentBackground, isEditing ? 'accent-background' : '')}>
          <Image width={953} height={550} alt={''} src="/accent-pattern.png" quality={100} />
        </div>
      </div>
      <Container>
        <Row>
          <Col>
            <div className={styles.cards}>
              {cards &&
                cards.map((card, _i) => <ServiceCard key={_i} card={card} isEditing={isEditing} />)}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
