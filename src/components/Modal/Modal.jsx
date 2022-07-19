import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, WorkSpace } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  handleEvents = event => {
    const { onModalClose } = this.props;
    if (event.key === 'Escape' || event.currentTarget === event.target) {
      window.removeEventListener('keydown', this.handleEvents);
      onModalClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEvents);
  }

  render() {
    const { image } = this.props;

    return createPortal(
      <Overlay onClick={this.handleEvents}>
        <WorkSpace>
          <img src={image} alt="" />
        </WorkSpace>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
