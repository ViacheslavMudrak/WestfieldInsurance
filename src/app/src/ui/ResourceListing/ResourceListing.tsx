import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';

export type ResourceListingCard = {
  title: JSX.Element | string;
  url: string;
};

export interface ResourceListingProps {
  cards: ResourceListingCard[];
}

export default function ResourceListing(props: ResourceListingProps): JSX.Element {
  // If numbers property is longer than 5 chracters and has space, it wraps to the next line and breaks the layout
  return (
    <div>
      <Container>
        <Row>
          <Col>
            {props.cards &&
              props.cards.map((card, _i) => (
                <div key={_i}>
                  <p>
                    <a href={card.url}>{card.title}</a>
                  </p>
                </div>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
