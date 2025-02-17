import classNames from 'classnames';
import { ComponentTheme } from 'src/types/generic';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './fullwidth-widget.module.scss';

export interface FullwidthWidgetProps {
  title?: JSX.Element | string;
  label?: JSX.Element | string;
  content?: JSX.Element | string;
  link?: JSX.Element | string;
  align?: 'center' | 'left' | undefined;
  theme?: ComponentTheme;
  isEditing?: boolean;
}

export default function FullwidthWidget({
  title,
  label,
  content,
  link,
  theme,
  isEditing,
}: FullwidthWidgetProps): JSX.Element {
  const isDarkTheme = theme === ComponentTheme.Dark;

  return (
    <div
      className={classNames(
        styles.banner,
        isDarkTheme ? styles.darkTheme : '',
        isEditing ? 'component' : ''
      )}
    >
      <Container>
        <Row>
          <Col size={12} lg={6} className={styles.contentBox}>
            <span className={classNames(styles.label, isEditing ? 'pages-label' : '')}>
              {label}
            </span>
            <h2 className={styles.title}>{title}</h2>
            {content && <div className={classNames(styles.content, 'rich-text')}>{content}</div>}
            {link && <div className={styles.buttonBox}>{link}</div>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
