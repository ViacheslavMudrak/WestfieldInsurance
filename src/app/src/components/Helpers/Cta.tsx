import { IsEditing } from './ContentUtil';
import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import styles from '../../ui/Button/button.module.scss';
import { ButtonVariants } from 'src/types/generic';

export type CtaProps = {
  params?: { [key: string]: string };
  link: LinkField;
  style: ButtonVariants;
};
const Cta = (props: CtaProps): JSX.Element => {
  if (IsEditing()) {
    return (
      <>
        <div className={styles.buttonBox}>
          <Link
            field={props.link}
            className={classNames(styles.btn, styles[props.style]) + ' cta-button'}
          />
        </div>
      </>
    );
  }
  return (
    <>
      {(props.link.value.href || props.link.value.anchor) && (
        <Link field={props.link} className={classNames(styles.btn, styles[props.style])}>
          {props.link.value.target === '_blank' && (
            <>
              {props.link.value.text}
              {/* TODO - update to use dictionary item keep the space at the beginning */}
              <span className="sr-only"> opens in new window</span>
            </>
          )}
        </Link>
      )}
    </>
  );
};

export default Cta;
