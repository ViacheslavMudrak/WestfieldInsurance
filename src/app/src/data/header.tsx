import WestFieldLogo from 'src/assets/icons/westfield-logo-dark.svg';
import { SiteLink } from 'src/types/generic';
import { v4 } from 'uuid';

export const DUMMY_HEADER_LOGO: JSX.Element = <WestFieldLogo />;

export const DUMMY_LOGIN_LINKS: SiteLink[] = [
  {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
        text: 'Customer',
      },
    },
    id: v4(),
  },
  {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
        text: 'Agent',
      },
    },
    id: v4(),
  },
];

export const DUMMY_TOP_LINKS: SiteLink[] = [
  {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
        text: 'File a claim',
      },
    },
    id: v4(),
  },
  {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
        text: 'Find an agent',
      },
    },
    id: v4(),
  },
  {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
        text: 'Pay your bill',
      },
    },
    id: v4(),
  },
  {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
        text: 'Become an agent',
      },
    },
    id: v4(),
  },
];
