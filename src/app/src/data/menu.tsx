import { Menu } from 'src/types/menu';
import { v4 } from 'uuid';

import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import Image from 'next/image';
import { DUMMY_CATEGORIES, DUMMY_CATEGORIES_THREE, DUMMY_CATEGORIES_TWO } from './categories';

const publicUrl = getPublicUrl();

export const DUMMY_MENU: Menu[] = [
  {
    id: v4(),
    name: 'Business Insurance',
    link: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
      },
    },
    card: {
      image: (
        <Image
          alt="Default card image"
          src={`${publicUrl}/card-default.png`}
          width="270"
          height="200"
        />
      ),
      title: 'lorem ipsum dolor sit amet',
      content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
      link: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
        },
      },
    },
    items: DUMMY_CATEGORIES_TWO,
  },
  {
    id: v4(),
    name: 'Personal Insurance',
    link: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
      },
    },
    items: DUMMY_CATEGORIES,
  },
  {
    id: v4(),
    name: 'About Us',
    link: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
      },
    },
    items: DUMMY_CATEGORIES,
  },
  {
    id: v4(),
    name: 'Careers',
    link: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
      },
    },
    items: DUMMY_CATEGORIES_THREE,
  },
];
