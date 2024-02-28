import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const Modal = ({ image, alt, handleModalClick }) => {
  const handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      handleModalClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleCloseModal);

    return () => {
      document.removeEventListener('keydown', handleCloseModal);
    };
  }, [handleCloseModal]);

  return (
    createPortal(
      <div className={s.overlay} onClick={handleCloseModal}>
        <div className={s.modal}>
          <img src={image} alt={alt} />
        </div>
      </div>, document.body,
    )
  );
};

export default Modal;
