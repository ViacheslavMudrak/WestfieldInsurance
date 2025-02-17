import { AccordionItemProps } from 'src/ui/Accordion/AccordionItem';
import { AccordionResult } from './types';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

export function MapAccordion(data: AccordionResult[], maxItems: number): AccordionItemProps[] {
  const itemLinks: AccordionItemProps[] = [];
  if (!data) return itemLinks;

  data.forEach((item, index) => {
    if (index < maxItems) {
      itemLinks.push({
        heading: <Text field={item.title.jsonValue} />,
        body: <RichText field={item.richTextCopy.jsonValue} />,
      });
    }
  });

  return itemLinks;
}
