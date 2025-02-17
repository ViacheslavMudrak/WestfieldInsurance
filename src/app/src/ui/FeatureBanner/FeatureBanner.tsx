import classNames from 'classnames';
import { useState } from 'react';
import { ComponentTheme } from 'src/types/generic';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './feature-banner.module.scss';
import ChevronDown from '/src/assets/icons/chevron-down.svg';

export interface FeatureBannerProps {
  image?: JSX.Element;
  title: JSX.Element | string;
  label?: JSX.Element | string;
  content?: JSX.Element | string;
  link?: JSX.Element | string;
  reverse?: boolean;
  theme?: ComponentTheme;
  isVideo?: boolean;
  src?: string;
  isEditing?: boolean;
  EditingLink?: JSX.Element;
  transcript?: JSX.Element;
  caption?: JSX.Element | string;
  seeTranscriptText?: string;
}

export default function FeatureBanner({
  image,
  title,
  label,
  content,
  link,
  reverse,
  theme,
  isVideo,
  src,
  isEditing,
  EditingLink,
  transcript,
  caption,
  seeTranscriptText,
}: FeatureBannerProps): JSX.Element {
  const [showTranscript, setShowTranscript] = useState(false);
  const showTranscriptStyles = showTranscript ? styles.show : null;
  const showToggleButton =
    (transcript && transcript.props === null) ||
    (transcript?.props?.field?.value && transcript?.props?.field?.value != '') ||
    isEditing;
  return (
    <div
      className={
        classNames(
          styles.banner,
          reverse && styles.reverse,
          theme === ComponentTheme.Dark && styles.greyBg
        ) + ' component'
      }
    >
      <Container>
        <Row>
          <Col size={12} md="6" className={styles.imageBox}>
            {isEditing && EditingLink}
            {!isVideo || isEditing ? (
              <>
                {isVideo ? (
                  <div className={styles.iframeWrapper}>
                    <iframe src={src} allow="fullscreen" />
                  </div>
                ) : (
                  <div className={styles.imageWrap}>{image}</div>
                )}
                {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
              </>
            ) : (
              <>
                <div className={styles.iframeWrapper}>
                  <iframe src={src} allow="fullscreen" />
                </div>
                {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
                {transcript && showToggleButton && (
                  <>
                    <button
                      className={classNames(styles.button, showTranscriptStyles)}
                      onClick={() => setShowTranscript(!showTranscript)}
                      aria-expanded={showTranscript}
                    >
                      {seeTranscriptText} <ChevronDown />
                    </button>
                  </>
                )}
              </>
            )}
            {((transcript && showTranscript) || isEditing) && (
              <>
                <div className={styles.transcript}>{transcript}</div>
              </>
            )}
          </Col>
          <Col size={12} md="6" className={styles.contentBox}>
            <div className={styles.inner}>
              <span className={classNames(styles.label, isEditing ? 'pages-label' : '')}>
                {label}
              </span>
              <h2 className={styles.title}>{title}</h2>
              {content && (
                <div
                  className={classNames(
                    styles.content,
                    'rich-text',
                    isEditing ? 'pages-feature-banner-content' : ''
                  )}
                >
                  {content}
                </div>
              )}
              {link && <div>{link}</div>}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
