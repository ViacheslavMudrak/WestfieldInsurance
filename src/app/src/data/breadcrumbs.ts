// import { v4 } from 'uuid';
// import { SiteLink } from '../types/generic';
import { Breadcrumb } from 'src/ui/Breadcrumbs/Breadcrumbs';

export const DUMMY_BREADCRUMBS: Breadcrumb[] = [
  {
    title: 'Home',
    path: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
    // id: v4(),
    // field: {
    //   value: {
    //     href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
    //     text: 'Home',
    //   },
    // },
  },
  {
    title: 'About Us',
    path: process.env.CUT_PAGES[1] ? `/cuts/${process.env.CUT_PAGES[1]}` : '/cuts',
    // id: v4(),
    // field: {
    //   value: {
    //     href: process.env.CUT_PAGES[1] ? `/cuts/${process.env.CUT_PAGES[1]}` : '/cuts',
    //     text: 'About Us',
    //   },
    // },
  },
  {
    title: 'One Column Template',
    path: process.env.CUT_PAGES[2] ? `/cuts/${process.env.CUT_PAGES[2]}` : '/cuts',
    // id: v4(),
    // field: {
    //   value: {
    //     href: process.env.CUT_PAGES[2] ? `/cuts/${process.env.CUT_PAGES[2]}` : '/cuts',
    //     text: 'One Column Template',
    //   },
    // },
  },
];
