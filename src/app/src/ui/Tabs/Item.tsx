import styles from './tabs.module.scss';

export interface TabsItemProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

export default function Item({ children, id }: TabsItemProps): JSX.Element {
  return (
    <div className={styles.item} id={id}>
      {children}
    </div>
  );
}
