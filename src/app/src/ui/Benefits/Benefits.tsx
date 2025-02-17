import classNames from 'classnames';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import BenefitsCard, { BenefitCard } from './BenefitsCard';
import styles from './benefits.module.scss';
import { ComponentTheme } from 'src/types/generic';

export interface BenefitsProps {
  title?: JSX.Element | string;
  label?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  cards?: BenefitCard[];
  isEditing?: boolean;
  theme?: ComponentTheme;
}

export default function Benefits({
  title,
  label,
  subtitle,
  cards,
  isEditing,
  theme,
}: BenefitsProps): JSX.Element {
  const isDarkTheme = theme === ComponentTheme.Dark;

  return (
    <div
      className={classNames(
        styles.benefits,
        isDarkTheme ? styles.darkTheme : '',
        isEditing ? 'component' : ''
      )}
    >
      <Container>
        <Row>
          <Col>
            <div className={classNames(styles.label, isEditing ? 'pages-label' : '')}>{label}</div>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.subtitle}>{subtitle}</div>
            <div className={styles.cards}>
              {cards &&
                cards.map((card, index) => {
                  return (
                    <BenefitsCard
                      key={index}
                      card={card}
                      isEditing={isEditing}
                      isDarkTheme={isDarkTheme}
                    />
                  );
                })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
