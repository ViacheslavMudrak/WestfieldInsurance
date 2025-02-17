import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import ChevronRight from 'src/assets/icons/chevron-right.svg';
import styles from './cutsListing.module.scss';

export default function CutsListing(): JSX.Element {
  const [showCuts, setShowCuts] = useState(true);

  return (
    <div className={classNames(styles.wrapper, !showCuts && styles.hide)}>
      <div className={styles.flag}>
        Pages
        <ChevronRight aria-label="chevron" />
      </div>
      <ul>
        {process.env.CUT_PAGES.map((page, i) => (
          <li key={i}>
            <Link href={`/cuts/${page}`}>{page === '' ? 'home' : page}</Link>
          </li>
        ))}
      </ul>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          onChange={(e) => setShowCuts(!e.target.checked)}
          defaultChecked={!showCuts}
        />
        Hide listing
      </label>
    </div>
  );
}
