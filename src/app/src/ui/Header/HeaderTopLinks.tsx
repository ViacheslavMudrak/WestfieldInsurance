import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { SiteLink } from 'src/types/generic';

export interface HeaderTopLinksProps {
  links: SiteLink[];
}

export default function HeaderTopLinks(props: HeaderTopLinksProps): JSX.Element {
  const { links } = props;
  const fireClose = () => {
    const event = new CustomEvent('headerLinkClick', {
      detail: { message: 'Header link clicked' },
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      {links && links.map((link) => <Link key={link.id} field={link.field} onClick={fireClose} />)}
    </>
  );
}
