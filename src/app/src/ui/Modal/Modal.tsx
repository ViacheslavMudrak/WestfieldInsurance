import { useEffect, useRef, useState } from 'react';
import CloseIcon from 'src/assets/icons/close-black.svg';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import styles from './modal.module.scss';

export interface ModalProps {
  children: JSX.Element[];
  isOpen: boolean;
  onClose?: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(isOpen);
  useOnClickOutside(wrapperRef, () => handleCloseModal());

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (modalOpen) {
        document.body.classList.add('modal-open');
        modalElement.showModal();
      } else {
        document.body.classList.remove('modal-open');
        modalElement.close();
      }
    }
  }, [modalOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  const focusOnClose = () => {
    const closeBtnRef = closeRef.current;
    closeBtnRef?.focus();
  };

  return (
    <dialog ref={modalRef} className={styles.modal} onKeyDown={handleKeyDown}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <button className={styles.btn} onClick={handleCloseModal} ref={closeRef}>
          <span className="sr-only">Close Modal</span>
          <CloseIcon />
        </button>
        {children}

        {/* For accessibility to allow keyboard user to close modal */}
        <button className={styles.btn} onFocus={() => focusOnClose()}>
          <span className="sr-only">Close Modal</span>
        </button>
      </div>
    </dialog>
  );
}
