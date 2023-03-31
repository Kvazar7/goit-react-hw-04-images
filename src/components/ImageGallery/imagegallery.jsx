import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/imagegalleryitem';
import css from '../ImageGallery/imagegallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
      
    <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags}) => (
          <ImageGalleryItem
            key={id}
            webFormat={webformatURL}
            largFormat={largeImageURL}
            alt={tags}
            openModal={openModal}
          />
        ))}
      </ul>
    );
}; 

ImageGallery.propTypes = {
  images: PropTypes.array,
  openModal: PropTypes.func,
}