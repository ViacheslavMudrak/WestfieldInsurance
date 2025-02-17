import classNames from 'classnames';
import styles from './author-bio.module.scss';

export interface AuthorBioProps {
  label: JSX.Element | string;
  bioName: JSX.Element | string;
  bioText?: JSX.Element | string;
  image?: JSX.Element;
}

export interface AuthorBioList {
  authors: AuthorBioProps[];
  isEditing?: boolean;
}

export default function AuthorBio(props: AuthorBioList): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {props.authors &&
        props.authors.map((author, _i) => (
          <div className={styles.authorBlock} key={_i}>
            <div className={styles.top}>
              {author.image && <figure className={styles.imageBox}>{author.image}</figure>}
              <div className={styles.info}>
                <span className={classNames(styles.label, props.isEditing ? 'pages-label' : '')}>
                  {author.label}
                </span>
                <div className={styles.name}>{author.bioName}</div>
              </div>
            </div>
            <div className={styles.text}>{author.bioText}</div>
          </div>
        ))}
    </div>
  );
}
