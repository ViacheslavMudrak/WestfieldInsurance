import classNames from 'classnames';
import { enforceComponentType } from '../../lib/utils';
import Button from '../Button/Button';
import styles from './button-group.module.scss';

interface ButtonGroupProps extends React.ComponentProps<'div'> {
  children: React.ReactElement<typeof Button> | React.ReactElement<typeof Button>[];
}

export default function ButtonGroup({ children, ...props }: ButtonGroupProps): JSX.Element {
  enforceComponentType(children, Button, 'Children of ButtonGroup must be a Button component');

  const { className, ...rest } = props;

  return (
    <div className={classNames(styles.group, className)} {...rest}>
      {children}
    </div>
  );
}
