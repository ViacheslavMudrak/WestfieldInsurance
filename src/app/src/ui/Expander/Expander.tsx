import classNames from 'classnames';
import { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './expander.module.scss';

export interface ExpanderProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
  active: boolean;
  transitionProps?: React.ComponentProps<typeof CSSTransition>;
}

const Expander = forwardRef<HTMLDivElement, ExpanderProps>(function Expander(
  { children, active, transitionProps, ...props },
  ref
) {
  const { className, ...rest } = props;
  return (
    <CSSTransition in={active} timeout={0} classNames="expander" nodeRef={ref} {...transitionProps}>
      <div
        className={classNames(styles.expander, className)}
        data-active={active}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </CSSTransition>
  );
});

export default Expander;
