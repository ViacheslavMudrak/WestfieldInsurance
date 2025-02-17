import UpArrow from 'src/assets/icons/up-arrow.svg';
import styles from './scroll-to-top.module.scss';

export default function ScrollToTop(): JSX.Element {
  function scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  return (
    <button onClick={() => scrollToTop()} className={styles.scrollTop} aria-label="Back to top">
      <UpArrow />
    </button>
  );
}
