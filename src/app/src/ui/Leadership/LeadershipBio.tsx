import classNames from 'classnames';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './leadership.module.scss';
import Image from 'next/image';

export interface LeadershipBioProps {
  personName: string | JSX.Element;
  title: string | JSX.Element;
  biography?: JSX.Element | string;
  image: JSX.Element;
  nextLink?: JSX.Element;
  bioLink?: JSX.Element;
  shortBio?: JSX.Element | string;
  isEditing?: boolean;
}

export interface LeadershipListingProps {
  persons: LeadershipBioProps[];
}

export default function LeadershipBio({
  personName,
  title,
  biography,
  image,
  nextLink,
  shortBio,
  isEditing,
}: LeadershipBioProps): JSX.Element {
  return (
    <div className={styles.wrapperBio}>
      <div className={styles.accentBackground}>
        <Image width={953} height={550} alt={''} src="/accent-pattern.png" quality={100} />
      </div>
      <Container>
        <Row>
          <Col>
            <div className={styles.innerBio}>
              <h1 className={styles.personName}>{personName}</h1>
              <div className={classNames(styles.title, isEditing ? 'pages-label' : '')}>
                {title}
              </div>
              <div className={styles.imageWrap}>{image}</div>
              <div className={styles.biography}>{biography}</div>
              {nextLink && <div className={styles.nextLink}>{nextLink}</div>}
            </div>
            {isEditing && (
              <div className={styles.biography}>
                <div>Short Bio Copy: only shown on Author Bio blurb</div>
                {shortBio}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
