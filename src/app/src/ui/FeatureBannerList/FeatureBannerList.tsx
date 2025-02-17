import classNames from 'classnames';
import { ComponentTheme } from 'src/types/generic';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './feature-banner-list.module.scss';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

export interface FeatureBannerListProps {
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  backgroundColor?: ComponentTheme;
  children?:
    | React.ReactElement<typeof Placeholder>
    | JSX.Element
    | React.ReactElement<typeof Placeholder>[];
  isEditing?: boolean;
}

export default function FeatureBannerList({
  title,
  subtitle,
  backgroundColor,
  children,
  isEditing,
}: FeatureBannerListProps) {
  return (
    <div
      className={classNames(
        styles.featureBannerList,
        backgroundColor,
        isEditing ? 'component' : ''
      )}
    >
      <Container className={styles.heading}>
        <Row>
          <Col>
            <h2 className={styles.title}>{title}</h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </Col>
        </Row>
      </Container>
      <div className={styles.bannerList}>{children && children}</div>
    </div>
  );
}
