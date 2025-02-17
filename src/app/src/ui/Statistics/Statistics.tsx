import classNames from 'classnames';
import { ComponentTheme } from 'src/types/generic';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './statistics.module.scss';

export type StatisticCard = {
  numbers: JSX.Element | string;
  content: JSX.Element | string;
};

export interface StatisticsProps {
  cards: StatisticCard[];
  vertical?: boolean;
  theme?: ComponentTheme;
  isEditing?: boolean;
}

export default function Statistics(props: StatisticsProps): JSX.Element {
  const isDarkTheme = props?.theme === ComponentTheme.Dark;
  const isAccentTheme = props?.theme === ComponentTheme.Accent;

  // If numbers property is longer than 5 chracters and has space, it wraps to the next line and breaks the layout
  const hasLongNumbers =
    !props.vertical &&
    props.cards.some((el) => {
      return el.numbers.toString().length > 5 && el.numbers.toString().includes(' ');
    });

  const getNumberOfCardsClass = (): string => {
    const numberOfCards = props.cards && props.cards.length;
    const numberOfCardsClass = numberOfCards <= 3 ? 'lessThanThree' : '';
    return numberOfCardsClass;
  };

  return (
    <div
      className={classNames(
        styles.wrapper,
        props.vertical ? styles.vertical : '',
        isDarkTheme ? styles.bgGray : '',
        isAccentTheme ? styles.accent : '',
        props.isEditing ? 'component pages-statistics' : '',
        props.isEditing && isAccentTheme ? 'accent-theme' : '',
        props.isEditing && isDarkTheme ? 'dark-theme' : ''
      )}
    >
      <Container>
        <Row>
          <Col className={styles.cardsWrap}>
            {props.cards &&
              props.cards.map((card, _i) => (
                <div
                  className={classNames(
                    styles.card,
                    getNumberOfCardsClass(),
                    isAccentTheme ? styles.accent : '',
                    props.isEditing ? 'pages-card' : ''
                  )}
                  key={_i}
                >
                  <p
                    className={classNames(
                      styles.numbers,
                      hasLongNumbers ? styles.hasLongNumbers : ''
                    )}
                  >
                    <span>{card.numbers}</span>
                  </p>
                  <div
                    className={classNames(styles.content, props.isEditing ? 'pages-content' : '')}
                  >
                    {card.content}
                  </div>
                </div>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
