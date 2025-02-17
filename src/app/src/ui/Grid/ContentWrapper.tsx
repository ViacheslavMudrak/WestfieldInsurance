import Col, { ColProps } from './Col';
import Container from './Container';
import Row from './Row';

export interface WrapperProps {
  children: JSX.Element;
  isFluid?: boolean;
  columnProps?: ColProps;
}

export default function ContentWrapper(props: WrapperProps) {
  const { children, isFluid = false, columnProps } = props;

  return (
    <Container fluid={isFluid}>
      <Row>
        <Col {...columnProps}>{children}</Col>
      </Row>
    </Container>
  );
}
