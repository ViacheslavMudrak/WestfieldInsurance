import classNames from 'classnames';
import styles from './accordion.module.scss';
import AccordionItem, { AccordionItemProps } from './AccordionItem';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import { ComponentTheme } from 'src/types/generic';

export interface AccordionProps {
  title: JSX.Element | string;
  theme?: ComponentTheme;
  questions: AccordionItemProps[];
  isEditing?: boolean;
}

export default function Accordion({
  title,
  questions,
  isEditing,
  theme,
}: AccordionProps): JSX.Element {
  return (
    <div
      className={classNames(
        styles.accordion,
        theme === ComponentTheme.Dark && styles.greyBg,
        isEditing ? 'component' : ''
      )}
    >
      <Container>
        <Row>
          <Col size={12}>
            <div className={styles.title}>{title}</div>
            {questions &&
              questions.map((item, _i) => (
                <AccordionItem
                  key={_i}
                  heading={item.heading}
                  body={item.body}
                  isEditing={isEditing}
                />
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
