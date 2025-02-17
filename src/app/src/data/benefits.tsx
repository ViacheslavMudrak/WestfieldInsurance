import BenefitsIcon from 'src/assets/icons/benefits.svg';
import HomeIcon from 'src/assets/icons/homes.svg';
import { BenefitsProps } from 'src/ui/Benefits/Benefits';
import { BenefitCard } from 'src/ui/Benefits/BenefitsCard';

export const exampleBenefitsProps = (props: BenefitsProps): BenefitsProps => {
  const { label, title, subtitle, cards } = props;

  return {
    title: title ? <div>{title}</div> : <div>Work With Us</div>,
    subtitle: subtitle ? (
      <div>{subtitle}</div>
    ) : (
      <div>
        Lorem ipsum dolor sit amet, consectetur <a href="#">adipiscing elit</a>, sed do eiusmod
        tempor incid Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incid
      </div>
    ),
    label: label ? <span>{label}</span> : <span>Working Text</span>,
    cards: cards ? cards : DUMMY_BENEFITS_CARDS,
  };
};

export const DUMMY_BENEFITS_CARD: BenefitCard = {
  icon: <BenefitsIcon />,
  title: 'Benefits',
  richTextCopy: (
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid</p>
  ),
  link: {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
      },
    },
    id: '',
  },
};

export const DUMMY_BENEFITS_CARD_LONG: BenefitCard = {
  icon: <HomeIcon />,
  title: 'Home',
  richTextCopy: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid Lorem
      ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incid Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid{' '}
    </p>
  ),
  link: {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
      },
    },
    id: '',
  },
};

export const DUMMY_BENEFITS_CARDS: BenefitCard[] = [
  DUMMY_BENEFITS_CARD,
  DUMMY_BENEFITS_CARD_LONG,
  DUMMY_BENEFITS_CARD,
  DUMMY_BENEFITS_CARD,
];
