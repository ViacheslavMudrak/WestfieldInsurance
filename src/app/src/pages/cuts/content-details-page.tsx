import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import Breadcrumbs from '../../ui/Breadcrumbs/Breadcrumbs';
import { DUMMY_BREADCRUMBS } from '../../data/breadcrumbs';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';
import ContentDetail from '../../ui/ContentDetail/ContentDetail';
import { exampleContentDetailProps } from 'src/data/contentDetail';

export default function ContentDetailPage(): JSX.Element {
  return (
    <LayoutStatic>
      <Container>
        <Row>
          <Col>
            <Breadcrumbs links={DUMMY_BREADCRUMBS} />
          </Col>
        </Row>
      </Container>
      <ContentDetail {...exampleContentDetailProps()} />
    </LayoutStatic>
  );
}
