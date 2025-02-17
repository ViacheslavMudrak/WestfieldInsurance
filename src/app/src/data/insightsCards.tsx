import Image from 'next/image';
import { ComponentTheme } from 'src/types/generic';
import { ImageLink } from 'src/types/imageLink';
import Button from 'src/ui/Button/Button';
import { v4 } from 'uuid';
import { InsightsCardsProps } from '../ui/InsightsCards/InsightsCards';

export const IMAGE_LINKS: ImageLink[] = [
  {
    title: 'Lorem ipsum dolor sit amet adipiscing.',
    content: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit ',
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/390/293"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Lorem ipsum dolor sit amet adipiscing',
        },
      },
    },
  },
  {
    title: 'Lorem ipsum dolor sit amet adipiscing2 longer text here....',
    content: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor ',
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/390/293"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Lorem ipsum dolor sit amet adipiscing',
        },
      },
    },
  },
  {
    title: 'Lorem ipsum dolor sit amet adipiscing3.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/390/293"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Lorem ipsum dolor sit amet adipiscing',
        },
      },
    },
  },
  {
    title: 'Lorem ipsum dolor sit amet adipiscing35.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/390/293"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: '',
          text: 'Lorem ipsum dolor sit amet adipiscing',
        },
      },
    },
  },
  {
    title: 'Lorem ipsum dolor sit amet adipiscing3.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/390/293"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Lorem ipsum dolor sit amet adipiscing',
        },
      },
    },
  },
  {
    title: 'Lorem ipsum dolor sit amet adipiscing3.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/390/293"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Lorem ipsum dolor sit amet adipiscing',
        },
      },
    },
  },
  {
    title: 'Lorem ipsum dolor sit amet adipiscing3.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
    image: (
      <Image
        alt="Alt goes here"
        src="https://picsum.photos/390/293"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    ),
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Lorem ipsum dolor sit amet adipiscing',
        },
      },
    },
  },
];

export const exampleInsightsCardsProps = (): InsightsCardsProps => {
  return {
    title: 'Insights',
    imageLinks: IMAGE_LINKS,
    link: (
      <Button variant="outline" href="https://www.google.com" target="_blank">
        View all insights
      </Button>
    ),
    theme: ComponentTheme.Dark,
  };
};
