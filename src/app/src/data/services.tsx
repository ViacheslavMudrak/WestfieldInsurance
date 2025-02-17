import BenefitsIcon from 'src/assets/icons/benefits.svg';
import HomeIcon from 'src/assets/icons/homes.svg';
import { ComponentTheme } from 'src/types/generic';
import { ServicesCard } from 'src/ui/ServicesCards/ServicesCard';
import { ServicesCardsProps } from 'src/ui/ServicesCards/ServicesCards';
import { v4 } from 'uuid';

export const exampleServicesCardsProps = (props: ServicesCardsProps): ServicesCardsProps => {
  const { label, title, cards, theme, isEditing } = props;

  return {
    title: title ? <div>{title}</div> : <div>Work With Us</div>,
    label: label ? <span>{label}</span> : <span>Working Text</span>,
    cards: cards ? cards : DUMMY_SERVICES_CARDS,
    theme: theme ? theme : ComponentTheme.Light,
    isEditing: isEditing ? isEditing : false,
  };
};

export const DUMMY_SERVICES_CARD: ServicesCard = {
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
    id: v4(),
  },
};

export const DUMMY_SERVICES_CARD_LONG: ServicesCard = {
  icon: <HomeIcon />,
  title: 'Home',
  richTextCopy: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid{' '}
    </p>
  ),
  link: {
    field: {
      value: {
        href: process.env.CUT_PAGES[0] ? `/cuts/${process.env.CUT_PAGES[0]}` : '/cuts',
      },
    },
    id: v4(),
  },
};

export const DUMMY_SERVICES_CARDS: ServicesCard[] = [
  DUMMY_SERVICES_CARD,
  DUMMY_SERVICES_CARD_LONG,
  DUMMY_SERVICES_CARD,
  DUMMY_SERVICES_CARD,
];
