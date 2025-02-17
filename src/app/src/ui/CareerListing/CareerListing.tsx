import { CareerLink } from 'src/types/careerLink';
import styles from './career-listing.module.scss';
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import CircleArrow from 'src/assets/icons/circle-arrow.svg';
import { ComponentTheme } from 'src/types/generic';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import classnames from 'classnames';
import classNames from 'classnames';

export interface CareerListingProps {
  title?: JSX.Element | string;
  theme?: ComponentTheme;
  reverse?: boolean;
  label?: JSX.Element | string;
  content?: JSX.Element | string;
  link?: JSX.Element | string;
  listItems?: CareerLink[];
  isEditing?: boolean;
}

export default function CareerListing({
  title,
  theme,
  reverse,
  label,
  content,
  link,
  listItems,
  isEditing,
}: CareerListingProps): JSX.Element {
  const isDarkTheme = theme === ComponentTheme.Dark;

  return (
    <div
      className={classnames(
        styles.wrapper,
        reverse ? styles.reverse : '',
        isDarkTheme ? styles.darkTheme : '',
        isEditing ? 'component' : ''
      )}
    >
      <Container>
        <Row className={styles.row}>
          <Col size={12} md={6} className={styles.contentBox}>
            <span className={classNames(styles.label, isEditing ? 'pages-label' : '')}>
              {label}
            </span>
            <h2 className={styles.title}>{title}</h2>
            {content && <div className={styles.content}>{content}</div>}
            {link && <div className={styles.buttonBox}>{link}</div>}
          </Col>
          <Col size={12} md={6} className={styles.linksBox}>
            {listItems &&
              listItems.map((cardlink) =>
                !isEditing ? (
                  <div key={cardlink.link.id} className={styles.linksItem}>
                    <div className={styles.textPart}>
                      <div>
                        <Link
                          {...cardlink.link}
                          className={classNames(styles.careersCardLinkText, styles.linksItemTitle)}
                        ></Link>
                        {cardlink.label && cardlink.label != '' && (
                          <span className={styles.linksItemLabel}>{cardlink.label}</span>
                        )}
                      </div>
                      <span className={styles.linksItemLocation}>{cardlink.location}</span>
                    </div>
                    <div className={styles.linksItemArrow}>
                      <CircleArrow />
                    </div>
                  </div>
                ) : (
                  <div key={cardlink.link.id} className={styles.linksItem}>
                    <div className={styles.textPart}>
                      <div>
                        <Link
                          {...cardlink.link}
                          className={classNames(
                            styles.careersCardLinkText,
                            styles.linksItemTitle,
                            isEditing ? 'pages-card-link' : ''
                          )}
                        ></Link>
                        <span className={classNames(styles.linksItemLabel, 'pages-label')}>
                          {cardlink.label}
                        </span>
                      </div>
                      <span className={styles.linksItemLocation}>{cardlink.location}</span>
                    </div>
                    <div className={styles.linksItemArrow}>
                      <CircleArrow />
                    </div>
                  </div>
                )
              )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
