import AutoIcon from 'src/assets/icons/auto.svg';
import BoatIcon from 'src/assets/icons/boat.svg';
import CamperIcon from 'src/assets/icons/camper.svg';
import CondosIcon from 'src/assets/icons/condos.svg';
import HomeIcon from 'src/assets/icons/house.svg';
import RentersIcon from 'src/assets/icons/renters.svg';
import { ProductCard } from 'src/types/productCard';
import { v4 } from 'uuid';
import { ProductCardsProps } from '../ui/ProductCards/ProductCards';

export const PRODUCT_CARDS: ProductCard[] = [
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor. ',
    icon: <HomeIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Home',
        },
      },
    },
  },
  {
    content: 'Lorem ipsum dolor sit amet',
    icon: <RentersIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Renters',
        },
      },
    },
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor ',
    icon: <CondosIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Condos',
        },
      },
    },
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor ',
    icon: <AutoIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Auto',
        },
      },
    },
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor ',
    icon: <BoatIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'Boat',
        },
      },
    },
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor ',
    icon: <CamperIcon />,
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: 'RV/Camper',
        },
      },
    },
  },
];

export const exampleProductCardsProps = (): ProductCardsProps => {
  return {
    title: 'Home & Vehicle Products',
    label: 'Personal Insurance',
    cards: PRODUCT_CARDS,
  };
};
