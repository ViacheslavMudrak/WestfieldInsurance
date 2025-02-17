import { CareerLink } from 'src/types/careerLink';
import { ComponentTheme } from 'src/types/generic';
import Button from 'src/ui/Button/Button';
import { CareerListingProps } from 'src/ui/CareerListing/CareerListing';
import { v4 } from 'uuid';

export const CAREER_LISTING: CareerLink[] = [
  {
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: '',
        },
      },
    },
    title: 'Claims Intern',
    label: 'New',
    location: 'Chicago, Illinois',
  },
  {
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: '',
        },
      },
    },
    title: 'HR Technology Leader (Oracle Cloud HCM)',
    label: 'New',
    location: 'San Francisco, California',
  },
  {
    link: {
      id: v4(),
      field: {
        value: {
          href: 'https://google.com',
          text: '',
        },
      },
    },
    title: 'SR Info Security Architect',
    label: 'New',
    location: 'San Francisco, California',
  },
];

export const exampleCareerListingProps = (): CareerListingProps => {
  return {
    title: 'Build your future at Westfield',
    label: 'CAREER SEARCH',
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem ullam adipisci
        excepturi magni inventore consequatur animi, consectetur at id aliquid eveniet doloremque
        dolore delectus culpa repellat reprehenderit error voluptatum!
      </p>
    ),
    link: (
      <Button variant="primary" href="https://www.google.com" target="_blank">
        All Careers
      </Button>
    ),
    theme: ComponentTheme.Light,
    reverse: false,
  };
};
