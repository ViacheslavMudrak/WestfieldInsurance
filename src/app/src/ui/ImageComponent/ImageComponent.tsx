import styles from './image-component.module.scss';

export interface ImageComponentProps {
  image: JSX.Element | string;
  caption?: JSX.Element | string;
}

export default function ImageComponent({ image, caption }: ImageComponentProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <figure className={styles.imageWrapper}>
        {image}
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </div>
  );
}
