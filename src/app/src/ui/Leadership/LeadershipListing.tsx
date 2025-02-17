import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './leadership.module.scss';
import { LeadershipListingProps } from './LeadershipBio';

export default function LeadershipListing(props: LeadershipListingProps): JSX.Element {
  return (
    <div className={styles.wrapperListing}>
      <Container>
        <Row>
          {props.persons &&
            props.persons.map((person, _i) => (
              <Col size={12} md={6} lg={4} className={styles.listingItem} key={_i}>
                <div className={styles.imageWrap}>{person.image}</div>
                <div className={styles.personName}>{person.personName}</div>
                <div className={styles.title}>{person.title}</div>
                {person.bioLink && <>{person.bioLink}</>}
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
