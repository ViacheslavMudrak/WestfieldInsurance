import Link from 'next/link';
import Col from '../../ui/Grid/Col';
import Container from '../../ui/Grid/Container';
import Row from '../../ui/Grid/Row';

export default function GridPage(): JSX.Element {
  return (
    <>
      <h1 className="example">
        Gridding Examples (v5.2){' '}
        <small>
          <Link href="https://getbootstrap.com/docs/5.2/layout/grid/">Docs</Link>
        </small>
      </h1>
      <Container>
        <Row>
          <Col>1 of 3</Col>
          <Col size="6">2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col size="5">2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
      <h1 className="example">
        Stack the columns on mobile by making one full-width and the other half-width
      </h1>
      <Container>
        <Row>
          <Col size="12" md="8">
            col-12 col-md-8
          </Col>
          <Col size="6" md="4">
            col-6 col-md-4
          </Col>
        </Row>
      </Container>
      <h1 className="example">
        Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop
      </h1>
      <Container>
        <Row>
          <Col size="6" md="4">
            col-6 col-md-4
          </Col>
          <Col size="6" md="4">
            col-6 col-md-4
          </Col>
          <Col size="6" md="4">
            col-6 col-md-4
          </Col>
        </Row>
      </Container>
      <h1 className="example">Columns are always 50% wide, on mobile and desktop</h1>
      <Container>
        <Row>
          <Col size="6">col-6</Col>
          <Col size="6">col-6</Col>
        </Row>
      </Container>
      <style jsx global>{`
        .site-container .row > [class*='col'] {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          background-color: rgba(86, 61, 124, 0.15);
          border: 1px solid rgba(86, 61, 124, 0.2);
        }

        .row + .row {
          margin-top: 1rem;
        }

        .example {
          text-align: center;
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
}
