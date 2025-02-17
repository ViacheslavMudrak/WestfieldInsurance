import classNames from 'classnames';
import styles from './share.module.scss';

export interface ShareProps {
  title?: JSX.Element | string;
  url: string;
  items: ShareItem[];
}

export interface ShareItem {
  icon: JSX.Element;
  text?: string;
  url?: string;
}

export default function Share({ title, url, items }: ShareProps): JSX.Element {
  const componentTitle = title ? title : 'Share this article';

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{componentTitle}</h2>
      {url &&
        items.length &&
        items.map((item, _i) => (
          <a key={_i} href={item.url + url} target="_blank" className={classNames(styles.link)}>
            {item.icon}
            <span className="sr-only">
              {item.text ? item.text + ', opens in a new window' : 'Share, opens in a new window'}
            </span>
          </a>
        ))}
    </div>
  );
}
