import styles from './generic-content.module.scss';

interface GenericContentProps {
  children: React.ReactNode;
}

export default function GenericContent({ children }: GenericContentProps): JSX.Element {
  return <div className={styles.content}>{children}</div>;
}
