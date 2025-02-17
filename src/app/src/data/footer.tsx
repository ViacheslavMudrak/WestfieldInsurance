import Link from 'next/link';
import EmailIcon from 'src/assets/icons/email.svg';
import FacebookIcon from 'src/assets/icons/facebook.svg';
import InstagramIcon from 'src/assets/icons/instagram.svg';
import LinkedinIcon from 'src/assets/icons/linkedin.svg';
import LocationIcon from 'src/assets/icons/location.svg';
import PhoneIcon from 'src/assets/icons/phone.svg';
import TwitterIcon from 'src/assets/icons/twitter.svg';
import WestfieldLogo from 'src/assets/icons/westfield-logo-light.svg';
import { FooterContentType } from 'src/types/footer';
import { v4 } from 'uuid';

export const DUMMY_FOOTER_LOGO: JSX.Element = <WestfieldLogo />;

export const DUMMY_FOOTER_LOCATIONS: JSX.Element[] = [
  <>
    <p>
      <LocationIcon /> Westfield USA
    </p>
    <p>One Park Circle</p>
    <p>P.O. Box 5001</p>
    <p>Westfield Center, OH 44251</p>
  </>,
  <>
    <p>
      <LocationIcon /> Westfield Specialty (International)
    </p>
    <p>Camomile Court, 23 Camomile Street,</p>
    <p>London, England, EC3A 7LL</p>
  </>,
];

export const DUMMY_FOOTER_SOCIAL = [
  <Link href="#" key={1}>
    <FacebookIcon aria-label="Facebook" />
  </Link>,
  <Link href="#" key={2}>
    <TwitterIcon aria-label="Twitter" />
  </Link>,
  <Link href="#" key={3}>
    <InstagramIcon aria-label="Instagram" />
  </Link>,
  <Link href="#" key={4}>
    <LinkedinIcon aria-label="LinkedIn" />
  </Link>,
];

export const DUMMY_FOOTER_CONTACT = [
  <>
    <PhoneIcon />
    800.243.0210
  </>,
  <>
    <EmailIcon />
    Send a Message
  </>,
];

export const DUMMY_FOOTER_LINKS: FooterContentType[] = [
  {
    id: v4(),
    type: 'text',
    content: {
      text: '© 2023 Westfield. All rights reserved.',
      id: v4(),
    },
  },
  {
    id: v4(),
    type: 'text',
    content: {
      text: 'Website design & development by Americaneagle.com',
      id: v4(),
    },
  },
  {
    id: v4(),
    type: 'link',
    content: {
      field: {
        value: {
          href: process.env.CUT_PAGES[1] ? `/cuts/${process.env.CUT_PAGES[1]}` : '/cuts',
          text: 'About Us',
        },
      },
      id: v4(),
    },
  },
  {
    id: v4(),
    type: 'link',
    content: {
      field: {
        value: {
          href: process.env.CUT_PAGES[2] ? `/cuts/${process.env.CUT_PAGES[2]}` : '/cuts',
          text: 'Careers',
        },
      },
      id: v4(),
    },
  },
  {
    id: v4(),
    type: 'link',
    content: {
      field: {
        value: {
          href: process.env.CUT_PAGES[3] ? `/cuts/${process.env.CUT_PAGES[3]}` : '/cuts',
          text: 'Accessibility',
        },
      },
      id: v4(),
    },
  },
  {
    id: v4(),
    type: 'link',
    content: {
      field: {
        value: {
          href: process.env.CUT_PAGES[4] ? `/cuts/${process.env.CUT_PAGES[4]}` : '/cuts',
          text: 'Site Map',
        },
      },
      id: v4(),
    },
  },
];
