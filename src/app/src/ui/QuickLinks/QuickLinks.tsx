import { CardLink } from 'src/types/cardLink';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './quick-links.module.scss';
import QuickLinksCard from './QuickLinkCard';
import classNames from 'classnames';
import { ComponentTheme } from 'src/types/generic';

export interface QuickLinksProps {
  title: string | JSX.Element;
  cardLinks?: CardLink[];
  isEditing?: boolean;
  theme?: ComponentTheme;
}

export default function QuickLinks({
  title,
  cardLinks,
  isEditing,
  theme,
}: QuickLinksProps): JSX.Element {
  const componentTheme =
    theme === ComponentTheme.Dark
      ? styles.dark
      : theme === ComponentTheme.Light
      ? styles.light
      : '';

  return (
    <div className={classNames(styles.wrapper, componentTheme, isEditing ? 'component' : '')}>
      <Container>
        <Row>
          <Col size="12">
            <h2 className={styles.title}>{title}</h2>
          </Col>
          <Col size="12" md={9} lg={12} className={styles.linksBox}>
            {cardLinks &&
              cardLinks.map((card, _i) => (
                <QuickLinksCard key={_i} card={card} isEditing={isEditing} />
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
