import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={s.list}>
      {images.map(({ id, largeImageURL, tags, webformatURL }, idx) => (
        <ImageGalleryItem
          openModalClick={onOpenModal}
          key={`${idx}+${id}`} // this resolving problems of backend when two children encountered with the same key
          largeUrl={largeImageURL}
          tags={tags}
          webUrl={webformatURL}
        />
      ))
      }
    </ul>
  );
};

export default ImageGallery;
