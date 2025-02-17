import classnames from 'classnames';
import { useState } from 'react';
import btnStyles from 'src/ui/Button/button.module.scss';
import Modal from '../Modal/Modal';
import styles from './video-modal.module.scss';

export interface VideoModalWrapperProps {
  src?: string;
  title?: string;
  transcriptLink?: string;
}

export default function VideoModalWrapper({
  src,
  title,
  transcriptLink,
}: VideoModalWrapperProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentIframeSrc, setCurrentIframeSrc] = useState<string>('');

  function openModal() {
    if (src) {
      setCurrentIframeSrc(src);
    }
    setModalOpen(true);
  }

  function closeModal() {
    setCurrentIframeSrc('');
    setModalOpen(false);
  }

  return (
    <div className={styles.videoModal}>
      <button
        className={classnames(btnStyles.btn, btnStyles.primary, 'openModalButton')}
        onClick={openModal}
      >
        {title}
      </button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className={styles.iframeWrapper}>
          {currentIframeSrc && (
            <>
              <iframe src={currentIframeSrc} onBlur={closeModal} allow="fullscreen" />
            </>
          )}
        </div>
        <div
          className={styles.transcriptLink}
          dangerouslySetInnerHTML={{ __html: transcriptLink || '' }}
        ></div>
      </Modal>
    </div>
  );
}
