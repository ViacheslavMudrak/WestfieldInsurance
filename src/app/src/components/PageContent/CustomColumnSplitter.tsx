import { ComponentRendering, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';

type CustomColumnSplitterProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
};

const CustomColumnSplitter = (
  { rendering }: CustomColumnSplitterProps,
  hasContainer: boolean
): JSX.Element => {
  if (hasContainer) {
    return (
      <Container>
        <Row>
          <Col size={12} md="6">
            <Placeholder name="column-splitter-left" rendering={rendering} />
          </Col>
          <Col size={12} md="6">
            <Placeholder name="column-splitter-right" rendering={rendering} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Row>
      <Col size={12} md="6">
        <Placeholder name="column-splitter-left" rendering={rendering} />
      </Col>
      <Col size={12} md="6">
        <Placeholder name="column-splitter-right" rendering={rendering} />
      </Col>
    </Row>
  );
};

export const Default = (props: CustomColumnSplitterProps): JSX.Element => {
  return CustomColumnSplitter(props, true);
};

export const NoContainer = (props: CustomColumnSplitterProps): JSX.Element => {
  return CustomColumnSplitter(props, false);
};
