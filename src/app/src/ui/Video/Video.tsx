import classNames from 'classnames';
import { useState } from 'react';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import styles from './video.module.scss';
import ChevronDown from '/src/assets/icons/chevron-down.svg';

export interface VideoProps {
  video: JSX.Element | string;
  transcript?: JSX.Element;
  caption?: JSX.Element | string;
  isEditing?: boolean;
  EditingLink?: JSX.Element;
  transcriptToggleText?: string;
  transcriptLink?: JSX.Element;
}

export default function Video({
  video,
  transcript,
  EditingLink,
  isEditing = false,
  caption,
  transcriptToggleText,
  transcriptLink,
}: VideoProps): JSX.Element {
  const [showTranscript, setShowTranscript] = useState(false);
  const showTranscriptStyles = showTranscript ? styles.show : null;
  const showToggleButton =
    (transcript && transcript.props === null) ||
    (transcript?.props?.field?.value && transcript?.props?.field?.value != '') ||
    isEditing;
  return (
    <Container>
      <Row>
        <Col size={12}>
          <div className={styles.wrapper}>
            {isEditing && EditingLink}
            <div className={styles.iframeWrapper}>
              <div className={styles.videoWrapper}>{video}</div>
              {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
              {transcript && showToggleButton && (
                <>
                  <button
                    className={classNames(styles.button, showTranscriptStyles)}
                    onClick={() => setShowTranscript(!showTranscript)}
                    aria-expanded={showTranscript}
                  >
                    {transcriptToggleText ?? 'See Transcript'} <ChevronDown />
                  </button>
                </>
              )}
            </div>

            {((transcript && showTranscript) || isEditing) && (
              <>
                <div className={styles.transcript}>{transcript}</div>
              </>
            )}
            {isEditing && transcriptLink}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
