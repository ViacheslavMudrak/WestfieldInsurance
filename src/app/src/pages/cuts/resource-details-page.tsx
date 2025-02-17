import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import Breadcrumbs from '../../ui/Breadcrumbs/Breadcrumbs';
import { DUMMY_BREADCRUMBS } from '../../data/breadcrumbs';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';
import ResourceDetail from '../../ui/ResourceDetail/ResourceDetail';
import {
  exampleResourceDetailProps,
  exampleAuthorBioProps,
  exampleImageComponentProps,
  exampleVideoProps,
  exampleShareProps,
} from 'src/data/resourceDetail';
import Share from 'src/ui/Share/Share';
import AuthorBio from 'src/ui/AuthorBio/AuthorBio';
import ImageComponent from 'src/ui/ImageComponent/ImageComponent';
import Video from 'src/ui/Video/Video';

export default function ResourceDetailPage(): JSX.Element {
  return (
    <LayoutStatic>
      <Container>
        <Row>
          <Col>
            <Breadcrumbs links={DUMMY_BREADCRUMBS} />
          </Col>
        </Row>
      </Container>
      <ResourceDetail {...exampleResourceDetailProps()} />
      <Container>
        <Row>
          <Col sm={12} lg={8} className="offset-lg-2">
            <ImageComponent {...exampleImageComponentProps()} />
            <Video {...exampleVideoProps()} />
            <AuthorBio {...exampleAuthorBioProps()} />
            <Share {...exampleShareProps()} />
          </Col>
        </Row>
      </Container>
    </LayoutStatic>
  );
}
