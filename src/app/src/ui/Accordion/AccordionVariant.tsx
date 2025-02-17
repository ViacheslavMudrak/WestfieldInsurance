import classNames from 'classnames';
import styles from './accordionVariant.module.scss';
import AccordionItem, { AccordionItemProps } from './AccordionItem';
import { ComponentTheme } from 'src/types/generic';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';

export interface AccordionVariantProps {
  title?: JSX.Element | string;
  theme?: ComponentTheme;
  label?: JSX.Element | string;
  content?: JSX.Element | string;
  link?: JSX.Element | string;
  twoColumn?: boolean;
  align?: 'left' | 'right' | undefined;
  questions: AccordionItemProps[];
  isEditing?: boolean;
}

export default function AccordionVariant({
  title,
  theme,
  label,
  content,
  link,
  twoColumn,
  align,
  questions,
  isEditing = false,
}: AccordionVariantProps): JSX.Element {
  const isDarkTheme = theme === ComponentTheme.Dark;

  return (
    <div
      className={classNames(
        styles.wrapper,
        isDarkTheme ? styles.greyBg : '',
        isEditing ? 'component' : ''
      )}
    >
      <Container>
        <Row className={align === 'left' ? styles.leftAligned : ''}>
          {twoColumn ? (
            <>
              <Col size={12} lg={6}>
                <div className={styles.contentBoxColumned}>
                  {label && (
                    <span className={classNames(styles.label, isEditing ? 'pages-label' : '')}>
                      {label}
                    </span>
                  )}
                  <h2 className={styles.title}>{title}</h2>
                  {content && <div className={styles.contentText}>{content}</div>}
                  {link && <div>{link}</div>}
                </div>
              </Col>
              <Col size={12} lg={6}>
                <div className={classNames(styles.accordion)}>
                  {questions &&
                    questions.map((item, _i) => (
                      <AccordionItem
                        key={_i}
                        heading={item.heading}
                        body={item.body}
                        variant
                        isEditing={isEditing}
                      />
                    ))}
                </div>
              </Col>
            </>
          ) : (
            <Col sm={12} lg={8} className="offset-lg-2">
              <div className={styles.contentBox}>
                {label && (
                  <span className={classNames(styles.label, isEditing ? 'pages-label' : '')}>
                    {label}
                  </span>
                )}
                <h2 className={styles.title}>{title}</h2>
              </div>
              <div className={classNames(styles.accordion)}>
                {questions &&
                  questions.map((item, _i) => (
                    <AccordionItem
                      key={_i}
                      heading={item.heading}
                      body={item.body}
                      variant
                      isEditing={isEditing}
                    />
                  ))}
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
