import { Category } from 'src/types/category';
import { v4 } from 'uuid';

export const DUMMY_CATEGORIES: Category[] = [
  {
    id: v4(),
    title: 'Category One',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Two',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Two',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Three',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Three',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
];

export const DUMMY_CATEGORIES_TWO: Category[] = [
  {
    id: v4(),
    title: 'Category One',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Two',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Two',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Three',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Three',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Four',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Four',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Five',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Five',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
];

export const DUMMY_CATEGORIES_THREE: Category[] = [
  {
    id: v4(),
    title: 'Category One',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    stack: true,
    id: v4(),
    title: 'Category Two',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    stack: true,
    id: v4(),
    title: 'Category Three',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Four',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Five',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    stack: true,
    id: v4(),
    title: 'Category Six',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
    ],
  },
];

export const DUMMY_CATEGORIES_NEW: Category[] = [
  {
    id: v4(),
    title: 'Category One',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    stack: true,
    id: v4(),
    title: 'Category Two',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Two',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    stack: true,
    id: v4(),
    title: 'Category Three',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Three',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Four',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Four',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    stack: true,
    id: v4(),
    title: 'Category Five',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Five',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category One',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category One',
        },
      },
      id: v4(),
    },
    links: [
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link One Lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Two',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Three very long extra text lorem ipsum',
          },
        },
        id: v4(),
      },
      {
        field: {
          value: {
            href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
            text: 'Link Four',
          },
        },
        id: v4(),
      },
    ],
  },
  {
    id: v4(),
    title: 'Category Six',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Six',
        },
      },
      id: v4(),
    },
    links: [],
  },
  {
    id: v4(),
    title: 'Category Seven',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Seven',
        },
      },
      id: v4(),
    },
    links: [],
  },
  {
    id: v4(),
    title: 'Category Six',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Six',
        },
      },
      id: v4(),
    },
    links: [],
  },
  {
    id: v4(),
    title: 'Category Seven',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Seven',
        },
      },
      id: v4(),
    },
    links: [],
  },
  {
    id: v4(),
    title: 'Category Six',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Six',
        },
      },
      id: v4(),
    },
    links: [],
  },
  {
    id: v4(),
    title: 'Category Seven',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Seven',
        },
      },
      id: v4(),
    },
    links: [],
  },
  {
    id: v4(),
    title: 'Category Six',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Six',
        },
      },
      id: v4(),
    },
    links: [],
  },
  {
    id: v4(),
    title: 'Category Seven',
    link: {
      field: {
        value: {
          href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
          text: 'Category Seven',
        },
      },
      id: v4(),
    },
    links: [],
  },
];
