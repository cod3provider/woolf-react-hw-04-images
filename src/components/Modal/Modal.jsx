import { Component } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = e => {
    const { handleModalClick } = this.props;
    if (e.target === e.currentTarget || e.code === 'Escape') {
      handleModalClick();
    }
  };

  render() {
    const { image, alt } = this.props;
    const { handleCloseModal } = this;

    return (
      createPortal(
        <div className={s.overlay} onClick={handleCloseModal}>
          <div className={s.modal}>
            <img src={image} alt={alt} />
          </div>
        </div>, document.body,
      )
    );
  }
}

export default Modal;
