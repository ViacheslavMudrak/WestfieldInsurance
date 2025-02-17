import { exampleBenefitsProps } from 'src/data/benefits';
import { exampleTextwidgetProps } from 'src/data/textwidget';
import { ComponentTheme } from 'src/types/generic';
import Benefits from 'src/ui/Benefits/Benefits';
import LayoutStatic from 'src/ui/Layout/LayoutStatic';
import { DUMMY_BREADCRUMBS } from '../../data/breadcrumbs';
import Breadcrumbs from '../../ui/Breadcrumbs/Breadcrumbs';
import FullwidthBanner from '../../ui/FullwidthWidget/FullwidthWidget';
import Col from '../../ui/Grid/Col';
import Container from '../../ui/Grid/Container';
import Row from '../../ui/Grid/Row';
import GenericContent from '../../ui/Layout/GenericContent';
import InteriorHeroBanner from 'src/ui/InteriorHeroBanner/InteriorHeroBanner';
import { exampleInteriorHeroBannerProps } from 'src/data/interiorHero';

export default function BecomeAnAgentPage(): JSX.Element {
  return (
    <LayoutStatic>
      <Breadcrumbs links={DUMMY_BREADCRUMBS} />
      <InteriorHeroBanner
        {...exampleInteriorHeroBannerProps({ theme: ComponentTheme.Dark, agentSearch: true })}
      />
      <Container>
        <Row>
          <Col>
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
      <Benefits {...exampleBenefitsProps({})} />
      {/* FullWidth Widget dark theme example */}
      <FullwidthBanner {...exampleTextwidgetProps({ theme: ComponentTheme.Dark })} />
      {/* FullWidth widget left aligned example */}
      <FullwidthBanner {...exampleTextwidgetProps({ align: 'left' })} />
    </LayoutStatic>
  );
}
