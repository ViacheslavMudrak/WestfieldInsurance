import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { useRef } from 'react';
import CaretDownIcon from 'src/assets/icons/caret-down.svg';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import useToggle from 'src/hooks/useToggle';
import { SiteLink } from 'src/types/generic';
import Button from '../Button/Button';
import styles from './header-login.module.scss';

export interface HeaderLoginProps {
  links: SiteLink[];
  className?: string;
}

export default function HeaderLogin(props: HeaderLoginProps): JSX.Element {
  const { links, className } = props;
  const [open, toggleOpen] = useToggle();
  const loginRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(loginRef, () => toggleOpen(false));

  return (
    <div ref={loginRef} className={styles.loginWrap}>
      <Button
        onClick={() => toggleOpen(!open)}
        className={classNames(styles.loginLink, open ? 'open' : null, className)}
        aria-expanded={open}
      >
        Login
        <CaretDownIcon />
      </Button>
      <HeaderLoginDropdown links={links} open={open} />
    </div>
  );
}

function HeaderLoginDropdown({
  open = false,
  links,
}: {
  open: boolean;
  links: SiteLink[];
}): JSX.Element {
  return (
    <div className={classNames(styles.dropdown, open ? 'open' : null)}>
      {links &&
        links.length > 1 &&
        links.map((link) => {
          return <Link key={link.id} field={link.field} />;
        })}
    </div>
  );
}
