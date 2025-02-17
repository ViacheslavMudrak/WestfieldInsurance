import { AccordionProps } from '../ui/Accordion/Accordion';
import { AccordionVariantProps } from '../ui/Accordion/AccordionVariant';
import { AccordionItemProps } from '../ui/Accordion/AccordionItem';
import { ComponentTheme } from 'src/types/generic';
import Button from 'src/ui/Button/Button';

export const ACCORDION_QUESTIONS: AccordionItemProps[] = [
  {
    heading: 'Reasonable Accommodation',
    body: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
  },
  {
    heading: 'Notes or Links',
    body: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
  },
  {
    heading: 'Warning about Fraudulent Recruitment',
    body: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
  },
  {
    heading: 'Question 2 Lorem ipsum dolor sit amet con sectetur adip iscing elit',
    body: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
  },
];

export const exampleAccordionProps = (): AccordionProps => {
  return {
    title: 'Notices',
    theme: ComponentTheme.Dark,
    questions: ACCORDION_QUESTIONS,
  };
};

export const exampleAccordionProps2 = (): AccordionVariantProps => {
  return {
    title: 'Lorem Ipsum',
    theme: ComponentTheme.Light,
    label: 'FAQ Text',
    content:
      'Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore. ',
    link: (
      <Button variant="primary" href="https://www.google.com" target="_blank">
        Testimonials
      </Button>
    ),
    twoColumn: true,
    align: 'left',
    questions: ACCORDION_QUESTIONS,
  };
};

export const exampleAccordionProps3 = (): AccordionVariantProps => {
  return {
    title: 'Notices',
    theme: ComponentTheme.Dark,
    label: 'FAQ Text',
    questions: ACCORDION_QUESTIONS,
  };
};
