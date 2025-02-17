import Image from 'next/image';
import { defaultInsuranceOptions } from 'src/data/agentSearch';
import { DUMMY_BREADCRUMBS } from 'src/data/breadcrumbs';
import { CARD_LINKS } from 'src/data/cardLinks';
import { exampleFeatureBannerListProps } from 'src/data/featureBannerList';
import { darkOverlayImage, exampleHeroBannerProps } from 'src/data/hero';
import { exampleInteriorHeroBannerProps } from 'src/data/interiorHero';
import { exampleListBannerProps } from 'src/data/listBanner';
import { DUMMY_SERVICES_CARD, exampleServicesCardsProps } from 'src/data/services';
import { ComponentTheme } from 'src/types/generic';
import Breadcrumbs from 'src/ui/Breadcrumbs/Breadcrumbs';
import FeatureBannerList from 'src/ui/FeatureBannerList/FeatureBannerList';
import ListBanner from 'src/ui/FeatureBannerList/ListBanner';
import HeroBanner from 'src/ui/HeroBanner/HeroBanner';
import InteriorHeroBanner from 'src/ui/InteriorHeroBanner/InteriorHeroBanner';
import QuickLinks from 'src/ui/QuickLinks/QuickLinks';
import ServicesCards from 'src/ui/ServicesCards/ServicesCards';
import VideoModalWrapper from 'src/ui/VideoModal/VideoModalWrapper';
import LayoutStatic from '../../ui/Layout/LayoutStatic';

export default function IndexPage(): JSX.Element {
  return (
    <LayoutStatic>
      <Breadcrumbs links={DUMMY_BREADCRUMBS} />
      <VideoModalWrapper
        src="https://www.youtube.com/embed/RVfckF-8uAQ?autoplay=1"
        title="Open modal"
      />
      <h1>Hello vercel!</h1>

      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          title: 'New banner',
          image: (
            <Image
              width="1185"
              height="350"
              alt="Alt goes here"
              src="/interior-herobanner-example.png"
              quality={100}
            />
          ),
          theme: ComponentTheme.Dark,
          agentSearch: true,
          agentSearchProps: {
            title: 'Agent Search',
            onSubmitForm: () => console.log('submitted :)'),
          },
          imageBottom: false,
        })}
      />

      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          title: 'New banner #2',
          image: (
            <Image
              width="1185"
              height="350"
              alt="Alt goes here"
              src="/interior-herobanner-example.png"
              quality={100}
            />
          ),
          theme: ComponentTheme.Gray,
          agentSearch: true,
          agentSearchProps: {
            title: 'Agent Search',
            onSubmitForm: () => console.log('submitted :)'),
          },
          imageBottom: true,
        })}
      />

      {/* Light theme */}
      <HeroBanner {...exampleHeroBannerProps({ theme: ComponentTheme.Dark })} />
      {/* Dark theme, overlay theme */}
      <HeroBanner
        {...exampleHeroBannerProps({
          theme: ComponentTheme.Dark,
          overlay: true,
          image: darkOverlayImage,
        })}
      />
      {/* Light theme, no agent banner */}
      <HeroBanner
        {...exampleHeroBannerProps({
          theme: ComponentTheme.Dark,
          agentSearch: true,
          agentSearchProps: {
            title: 'agent search',
            onSubmitForm: () => console.log('sumit'),
            insuranceOptions: defaultInsuranceOptions,
          },
        })}
      />
      {/* Feature Banner List */}
      <FeatureBannerList {...exampleFeatureBannerListProps({})}>
        <>
          <ListBanner {...exampleListBannerProps({})} />
          <ListBanner {...exampleListBannerProps({ invert: true })} />
          {/* <ListBanner {...exampleListBannerProps({})} /> */}
        </>
      </FeatureBannerList>
      {/* No image, agent search */}
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          agentSearch: true,
          agentSearchProps: {
            title: 'Agent Search',
            onSubmitForm: () => console.log('submitted :)'),
          },
          agentSearchTheme: ComponentTheme.Dark,
          overflowTheme: ComponentTheme.Light,
        })}
      />
      {/* No image, no agent search */}
      <InteriorHeroBanner {...exampleInteriorHeroBannerProps({})} />
      {/* Light theme, agent search */}
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          image: (
            <Image
              width="1185"
              height="495"
              alt="Alt goes here"
              src="/interior-herobanner-example.png"
              quality={100}
            />
          ),
          agentSearch: true,
        })}
      />
      {/* Light theme, no agent search */}
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
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
      {/* Dark theme, no image, agent search */}
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          theme: ComponentTheme.Dark,
          agentSearch: true,
          agentSearchProps: {
            title: 'Agent Search',
            onSubmitForm: () => console.log('submitted :)'),
          },
        })}
      />
      {/* Light theme, fewer than 4 cards */}
      <ServicesCards
        {...exampleServicesCardsProps({ cards: new Array(2).fill(DUMMY_SERVICES_CARD) })}
      />
      {/* Dark theme, no image, no agent search */}
      <InteriorHeroBanner {...exampleInteriorHeroBannerProps({ theme: ComponentTheme.Dark })} />
      {/* Dark theme, image, agent search */}
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          theme: ComponentTheme.Dark,
          agentSearch: true,
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
      {/* Dark theme, image, no agent search */}
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({
          theme: ComponentTheme.Dark,
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
      {/* Light theme */}
      <ServicesCards {...exampleServicesCardsProps({})} />

      {/* Light theme, more than 4 cards */}
      <ServicesCards
        {...exampleServicesCardsProps({ cards: new Array(7).fill(DUMMY_SERVICES_CARD) })}
      />
      {/* Accent theme */}
      <ServicesCards {...exampleServicesCardsProps({ theme: ComponentTheme.Accent })} />
      {/* Dark theme */}
      <ServicesCards {...exampleServicesCardsProps({ theme: ComponentTheme.Dark })} />

      <QuickLinks cardLinks={CARD_LINKS} title="Quick Links Default" />
      <QuickLinks cardLinks={CARD_LINKS} title="Quick Links Dark" theme={ComponentTheme.Dark} />
      <QuickLinks cardLinks={CARD_LINKS} title="Quick Links Light" theme={ComponentTheme.Light} />
    </LayoutStatic>
  );
}
