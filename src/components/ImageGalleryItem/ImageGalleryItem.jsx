import PropTypes from 'prop-types';

import { GalleryItem, Picture } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onModalState }) => {
  const handlePictureClick = event => {
    const imageURL = event.target.alt;
    onModalState(imageURL);
  };

  return (
    <GalleryItem>
      <Picture
        src={webformatURL}
        alt={largeImageURL}
        onClick={handlePictureClick}
      />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onModalState: PropTypes.func.isRequired,
};
