import styles from './example-component.module.scss';

export interface ExampleComponentPropsUi {
  title: JSX.Element | string;
  richTextCopy?: JSX.Element | string;
  copy: JSX.Element | string;
  image?: JSX.Element;
  link?: JSX.Element | string;
}

export default function ExampleComponent({
  title,
  richTextCopy,
  copy,
  image,
  link,
}: ExampleComponentPropsUi): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <h1 className={'exampleComponent'}>{title}</h1>
      {richTextCopy && <div>{richTextCopy}</div>}
      <div>{copy}</div>
      <div>{image}</div>
      <div>{link && <div>{link}</div>}</div>
    </div>
  );
}
