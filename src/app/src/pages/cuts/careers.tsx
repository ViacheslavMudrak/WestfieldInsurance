import Image from 'next/image';
import { exampleInteriorHeroBannerProps } from 'src/data/interiorHero';
import { exampleProductCardsProps } from 'src/data/productCards';
import { DUMMY_STATISTICS, DUMMY_STATISTICS_2, DUMMY_STATISTICS_3 } from 'src/data/statistics';
import { ComponentTheme } from 'src/types/generic';
import Button from 'src/ui/Button/Button';
import InteriorHeroBanner from 'src/ui/InteriorHeroBanner/InteriorHeroBanner';
import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import ProductCards from 'src/ui/ProductCards/ProductCards';
import Statistics from 'src/ui/Statistics/Statistics';

export default function CareersLandingPage(): JSX.Element {
  return (
    <LayoutStatic>
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          theme: ComponentTheme.Accent,
          agentSearch: false,
          link: (
            <Button variant="primary" href="https://www.google.com" target="_blank">
              Search jobs
            </Button>
          ),
          image: (
            <Image
              width="1185"
              height="495"
              alt="Alt goes here"
              src="/interior-herobanner-example.png"
              quality={100}
            />
          ),
        })}
      />
      <Statistics cards={DUMMY_STATISTICS_2} />
      <Statistics cards={DUMMY_STATISTICS} theme={ComponentTheme.Light} />
      <Statistics vertical cards={DUMMY_STATISTICS} theme={ComponentTheme.Dark} />
      <Statistics cards={DUMMY_STATISTICS_3} theme={ComponentTheme.Accent} />
      <ProductCards {...exampleProductCardsProps()} />
      <Statistics vertical cards={DUMMY_STATISTICS_2} />
    </LayoutStatic>
  );
}
