import Button from 'src/ui/Button/Button';
import { FullwidthWidgetProps } from 'src/ui/FullwidthWidget/FullwidthWidget';
import { ComponentTheme } from 'src/types/generic';

export const exampleTextwidgetProps = (props: FullwidthWidgetProps): FullwidthWidgetProps => {
  const { title, label, content, link, align, theme } = props;
  return {
    title: title ? title : 'Prospective Agents',
    label: label ? label : 'Our team',
    content: content ? (
      content
    ) : (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur autem ullam adipisci
        excepturi magni inventore consequatur animi, consectetur at id aliquid eveniet doloremque
        dolore delectus culpa repellat reprehenderit error voluptatum!
      </p>
    ),
    link: link ? (
      link
    ) : (
      <Button variant="outline" href="https://www.google.com" target="_blank">
        Become an agent
      </Button>
    ),
    align: align ? align : 'center',
    theme: theme ? theme : ComponentTheme.Light,
  };
};
