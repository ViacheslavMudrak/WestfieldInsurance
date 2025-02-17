import Image from 'next/image';
import Button from 'src/ui/Button/Button';
import { FeatureBannerProps } from '../ui/FeatureBanner/FeatureBanner';

export const defaultTestTranscript = (
  <div>
    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
    dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
    ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor
    sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
    dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
    ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor
    sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
    dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
    ipsum dolor sit amet. Lorem ipsum dolor sit amet.
  </div>
);

export const exampleBannerProps = (): FeatureBannerProps => {
  return {
    title: 'Voice of Customer',
    label: 'About Us',
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <a href="#">Test</a> Aspernatur
        autem ullam adipisci excepturi magni inventore consequatur animi, consectetur at id aliquid
        eveniet doloremque dolore delectus culpa repellat reprehenderit error voluptatum!
      </p>
    ),
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/600/400"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: (
      <Button variant="primary" href="https://www.google.com" target="_blank">
        Testimonials
      </Button>
    ),
  };
};
