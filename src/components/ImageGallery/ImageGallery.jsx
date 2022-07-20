import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ data, isQueryCorrect, onModalState }) => {
  return (
    <Gallery>
      {isQueryCorrect ? (
        data.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onModalState={onModalState}
          />
        ))
      ) : (
        <p>{'Pictures have not been found :('} </p>
      )}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  isQueryCorrect: PropTypes.bool.isRequired,
};
