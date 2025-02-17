import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import classNames from 'classnames';
import variables from 'src/sass/modules/exports.module.scss';
import { ComponentTheme } from 'src/types/generic';
import { ImageLink } from 'src/types/imageLink';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import carouselStyles from './../Carousel/carousel.module.scss';
import InsightCard from './InsightsCard';
import styles from './insights-cards.module.scss';

export interface InsightsCardsProps {
  title: JSX.Element | string;
  imageLinks: ImageLink[];
  link?: JSX.Element | string;
  isEditing?: boolean;
  theme?: ComponentTheme;
}

export default function InsightsCards({
  title,
  imageLinks,
  link,
  isEditing = false,
  theme,
}: InsightsCardsProps): JSX.Element {
  const breakPointMd = parseInt(variables.breakPointMd, 10);
  const isDarkTheme = theme === ComponentTheme.Dark;
  const sliderOptions: Options = {
    gap: '20px',
    padding: { left: '20px', right: '60px' },
    perPage: 1,
    perMove: 1,
    snap: true,
    rewind: false,
    drag: 'free',
    pagination: true,
    arrows: false,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    type: 'slide',
    speed: 400,
    mediaQuery: 'min',
    breakpoints: {
      [breakPointMd]: {
        perPage: 10,
        destroy: true,
      },
    },
  };

  return (
    <div
      className={classNames(
        styles.wrapper,
        isDarkTheme ? styles.darkTheme : '',
        isEditing ? 'component' : ''
      )}
    >
      <Container>
        <Row>
          <Col size={12} className={styles.contentBox}>
            <h2 className={styles.title}>{title}</h2>
          </Col>
        </Row>
      </Container>
      <div
        className={classNames(
          styles.cardsBox,
          carouselStyles.hasCarousel,
          carouselStyles.noCarouselTabletDesktop
        )}
      >
        <Splide hasTrack={false} options={sliderOptions}>
          <SplideTrack>
            {imageLinks &&
              imageLinks.map((card, _i) => (
                <SplideSlide
                  key={_i}
                  className={classNames(carouselStyles.carouselItem, styles.insightsCarouselItem)}
                >
                  <InsightCard card={card} isEditing={isEditing} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
      <Container>
        <Row>
          <Col size="12">{link && <div className={styles.buttonBox}>{link}</div>}</Col>
        </Row>
      </Container>
    </div>
  );
}
