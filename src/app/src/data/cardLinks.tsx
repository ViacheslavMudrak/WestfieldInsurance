import { CardLink } from 'src/types/cardLink';
import ListIcon from 'src/assets/icons/list.svg';
import MagnifyingGlassIcon from 'src/assets/icons/magnifying-glass.svg';
import CloudIcon from 'src/assets/icons/cloud.svg';
import PayIcon from 'src/assets/icons/pay.svg';
import ScaleIcon from 'src/assets/icons/scale.svg';
import HomesIcon from 'src/assets/icons/homes.svg';
import { v4 } from 'uuid';

export const CARD_LINKS: CardLink[] = [
  {
    icon: <ListIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Select Coverage',
        },
      },
    },
  },
  {
    icon: <MagnifyingGlassIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Find an Agent',
        },
      },
    },
  },
  {
    icon: <CloudIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'File a Claim',
        },
      },
    },
  },
  {
    icon: <PayIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Pay Your Bill',
        },
      },
    },
  },
  {
    icon: <ScaleIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Utility Nav 1',
        },
      },
    },
  },
  {
    icon: <HomesIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Utility Nav 2',
        },
      },
    },
  },
];
