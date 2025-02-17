import A11YSlider from 'a11y-slider';
import 'a11y-slider/dist/a11y-slider.css';
import React, { useEffect, useRef } from 'react';
import Hero from 'src/ui/Hero/Hero';
import { enforceComponentType } from 'src/lib/utils';
import styles from './hero-slider.module.scss';

interface HeroSliderProps {
  children: React.ReactElement<typeof Hero> | React.ReactElement<typeof Hero>[];
}

export default function HeroSlider({ children }: HeroSliderProps): JSX.Element {
  const el = useRef<HTMLDivElement>(null);
  const a11ySlider = useRef<A11YSlider | null>(null);

  enforceComponentType(children, Hero, 'Children of HeroSlider must be a Hero component');
  useEffect(() => {
    if (el.current && !a11ySlider.current) {
      a11ySlider.current = new A11YSlider(el.current, {
        slidesToShow: 1,
        arrows: false,
      });
    }

    return () => {
      a11ySlider.current?.destroy();
      a11ySlider.current = null;
    };
  });

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.slider} ref={el} data-testid="slider">
        {children}
      </div>
    </div>
  );
}
