import Image from 'next/image';
import Banner from '../../ui/Banner/Banner';
import Breadcrumbs from '../../ui/Breadcrumbs/Breadcrumbs';
import Col from '../../ui/Grid/Col';
import Container from '../../ui/Grid/Container';
import Row from '../../ui/Grid/Row';
import GenericContent from '../../ui/Layout/GenericContent';
import { DUMMY_BREADCRUMBS } from '../../data/breadcrumbs';

export default function InteriorPage(): JSX.Element {
  return (
    <>
      <Banner
        title="One Column Template"
        subtitle={
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non enim fuga facere,
            repudiandae unde magnam ad odit porro qui laudantium aliquid nemo voluptatum. Delectus
            eaque nesciunt totam adipisci veritatis vitae.
          </p>
        }
        image={
          <Image
            alt="Alt goes here"
            src="https://picsum.photos/1920/275"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        }
      />
      <Container>
        <Row>
          <Col>
            <Breadcrumbs links={DUMMY_BREADCRUMBS} />
            <GenericContent>
              <h2>A standard one column page</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit ducimus odio
                in at est molestias pariatur mollitia asperiores sed dolores, aperiam eaque? Fugit
                nobis, pariatur tempore tempora delectus numquam voluptatem?
              </p>
              <p>
                Lorem until friendly take attack team halfway matter since those behind wagon its
                trick clothes noted job lady bicycle whose parts path unknown least manner
              </p>
            </GenericContent>
          </Col>
        </Row>
      </Container>
    </>
  );
}
