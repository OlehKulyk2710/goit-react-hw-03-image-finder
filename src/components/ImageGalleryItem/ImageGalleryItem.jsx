import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

import { GalleryItem, Picture } from './ImageGalleryItem.styled';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleModalState = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <GalleryItem>
        <Picture
          src={webformatURL}
          alt={largeImageURL}
          onClick={() => this.handleModalState()}
        />
        {isModalOpen && (
          <Modal image={largeImageURL} onModalClose={this.handleModalState} />
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
