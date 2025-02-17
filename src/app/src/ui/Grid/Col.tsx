import classNames from 'classnames';
import React from 'react';

type ColWidth =
  | number
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'auto';

export interface ColProps {
  children?: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  size?: ColWidth;
  sm?: ColWidth;
  md?: ColWidth;
  lg?: ColWidth;
  xl?: ColWidth;
  xxl?: ColWidth;
  className?: string;
  center?: boolean;
}

const Col = ({
  tag = 'div',
  size,
  sm,
  md,
  lg,
  xl,
  xxl,
  center,
  className,
  ...props
}: ColProps): JSX.Element => {
  const Tag = tag;
  const classes = classNames(
    size ? `col-${size}` : 'col',
    sm && `col-sm-${sm}`,
    md && `col-md-${md}`,
    lg && `col-lg-${lg}`,
    xl && `col-xl-${xl}`,
    xxl && `col-xxl-${xxl}`,
    center && 'col-center',
    className
  );

  return (
    <Tag className={classes} {...props}>
      {props.children}
    </Tag>
  );
};

export default Col;
