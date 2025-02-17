import classNames from 'classnames';
import React from 'react';
import { enforceComponentType } from 'src/lib/utils';
import Row from './Row';

interface ContainerProps extends React.ComponentProps<'div'> {
  fluid?: boolean;
  children?: React.ReactElement<typeof Row> | React.ReactElement<typeof Row>[];
}

const Container = ({
  fluid = false,
  className,
  children,
  ...restProps
}: ContainerProps): JSX.Element => {
  enforceComponentType(children, Row, 'Children of Container must be a Row component');
  const containerClass = fluid ? 'container-fluid' : 'container';

  return (
    <div className={classNames(containerClass, className)} {...restProps}>
      {children}
    </div>
  );
};

export default Container;
