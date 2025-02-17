import classNames from 'classnames';
import React from 'react';
import { enforceComponentType } from 'src/lib/utils';
import Col from './Col';

interface RowProps extends React.ComponentProps<'div'> {
  children?: React.ReactElement<typeof Col> | React.ReactElement<typeof Col>[];
}

const Row = (props: RowProps): JSX.Element => {
  enforceComponentType(
    props.children,
    Col,
    'Children of Row must be a Col or Placeholder component'
  );
  const { className, ...restProps } = props;

  return (
    <div className={classNames('row', className)} {...restProps}>
      {props.children}
    </div>
  );
};

export default Row;
