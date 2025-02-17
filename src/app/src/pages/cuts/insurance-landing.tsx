import {
  exampleAccordionProps,
  exampleAccordionProps2,
  exampleAccordionProps3,
} from 'src/data/accordion';
import { defaultTestTranscript, exampleBannerProps } from 'src/data/banner';
import { CAREER_LISTING, exampleCareerListingProps } from 'src/data/careerListing';
import { exampleInsightsCardsProps } from 'src/data/insightsCards';
import { exampleProductCardsProps } from 'src/data/productCards';
import { ComponentTheme } from 'src/types/generic';
import Accordion from 'src/ui/Accordion/Accordion';
import AccordionVariant from 'src/ui/Accordion/AccordionVariant';
import CareerListing from 'src/ui/CareerListing/CareerListing';
import InsightsCards from 'src/ui/InsightsCards/InsightsCards';
import RichTextCards from 'src/ui/RichTextCards/RichTextCards';
import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import ProductCards from 'src/ui/ProductCards/ProductCards';
import FeatureBanner from '../../ui/FeatureBanner/FeatureBanner';

export default function InsuranceLandingPage(): JSX.Element {
  return (
    <LayoutStatic>
      <FeatureBanner
        {...exampleBannerProps()}
        isVideo
        src="https://www.youtube.com/embed/RVfckF-8uAQ?autoplay=1"
        transcript={defaultTestTranscript}
      />
      <FeatureBanner {...exampleBannerProps()} reverse />
      <FeatureBanner {...exampleBannerProps()} theme={ComponentTheme.Dark} />
      <CareerListing {...exampleCareerListingProps()} listItems={CAREER_LISTING} />
      <ProductCards {...exampleProductCardsProps()} />
      <ProductCards {...exampleProductCardsProps()} carousel={true} theme={ComponentTheme.Dark} />
      <AccordionVariant {...exampleAccordionProps2()} />
      <AccordionVariant {...exampleAccordionProps3()} />
      <InsightsCards {...exampleInsightsCardsProps()} />
      <RichTextCards {...exampleInsightsCardsProps()} />
      <Accordion {...exampleAccordionProps()} />
    </LayoutStatic>
  );
}
