import { ProductCard } from 'src/types/productCard';
import classNames from 'classnames';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './product-cards.module.scss';
import carouselStyles from './../Carousel/carousel.module.scss';
import ProductCardItem from './ProductCardItem';
import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import variables from 'src/sass/modules/exports.module.scss';
import { ComponentTheme } from 'src/types/generic';

export interface ProductCardsProps {
  title: JSX.Element | string;
  label?: JSX.Element | string;
  cards?: ProductCard[];
  isEditing?: boolean;
  theme?: ComponentTheme;
  carousel?: boolean;
}

export default function ProductCards({
  title,
  label,
  cards,
  isEditing,
  theme,
  carousel,
}: ProductCardsProps): JSX.Element {
  const breakPointLgMax = parseInt(variables.breakPointLgMax, 10);
  const breakPointMdMax = parseInt(variables.breakPointMdMax, 10);

  const sliderOptions: Options = {
    gap: '20px',
    padding: { left: '60px', right: '60px' },
    perPage: 3,
    perMove: 1,
    snap: true,
    rewind: false,
    drag: 'free',
    pagination: false,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    type: 'slide',
    speed: 400,
    breakpoints: {
      [breakPointLgMax]: {
        perPage: 2,
        padding: { left: '60px', right: '60px' },
      },
      [breakPointMdMax]: {
        perPage: 1,
        padding: { left: '20px', right: '60px' },
        pagination: true,
        arrows: false,
      },
    },
  };

  return (
    <div
      className={classNames(
        styles.wrapper,
        theme === ComponentTheme.Dark ? styles.greyBg : '',
        carousel ? carouselStyles.hasCarousel : styles.noCarousel,
        isEditing ? 'component' : ''
      )}
    >
      <Container className={styles.container}>
        <Row>
          <Col size="12">
            <span className={classNames(styles.label, isEditing ? 'pages-label' : '')}>
              {label}
            </span>
            <h2 className={styles.title}>{title}</h2>
          </Col>
          <Col size="12" className={!carousel ? styles.cardsBoxWrap : ''}>
            {!carousel && (
              <div className={styles.cardsBox}>
                {cards &&
                  cards.map((card, index) => (
                    <ProductCardItem key={index} card={card} isEditing={isEditing} />
                  ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {carousel && (
        <Splide hasTrack={false} options={sliderOptions}>
          <SplideTrack>
            {cards &&
              cards.map((card, _i) => (
                <SplideSlide key={_i} className={carouselStyles.carouselItem}>
                  <ProductCardItem key={_i} card={card} isEditing={isEditing} />
                </SplideSlide>
              ))}
          </SplideTrack>
          <Container>
            <Row>
              <Col size="12">
                <div className="splide__arrows" />
              </Col>
            </Row>
          </Container>
        </Splide>
      )}
    </div>
  );
}
