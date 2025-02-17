import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import styles from './button.module.scss';
import { ButtonVariants } from 'src/types/generic';

type BaseProps = React.PropsWithChildren & {
  href?: string;
  variant?: ButtonVariants;
};

type ButtonHTMLProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorHTMLProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = BaseProps & ButtonHTMLProps & AnchorHTMLProps;

export default function Button(props: ButtonProps): JSX.Element {
  const { href, variant, children, ...otherProps } = props;
  const variantStyle = variant || 'primary';

  if (href) {
    return (
      <Link
        {...otherProps}
        href={href}
        className={classNames(styles.btn, styles[variantStyle], otherProps.className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...otherProps}
      className={classNames(styles.btn, styles[variantStyle], otherProps.className)}
    >
      {children}
    </button>
  );
}
