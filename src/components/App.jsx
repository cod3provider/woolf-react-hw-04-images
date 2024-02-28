import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Container from './Container/Container';
import Loader from './Loader/Loader';

import { getImages, PER_PAGE, responseImages } from '../api/API';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const searchImages = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsShowModal(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const { hits, totalHits } = await getImages(query, page);
        const newImages = responseImages(hits);

        if (newImages.length === 0) {
          toast.warn('Images not found');
          return;
        }
        if (page === 1) {
          setTotalPages(Math.ceil(totalHits / PER_PAGE));
        }
        setImages(prevImages => [...prevImages, ...newImages]);
      }
      catch (err) {
        toast.error('Something went wrong.');
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleToggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleOpenModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    handleToggleModal();
  };

  const handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      handleToggleModal();
    }
  };

  const isMoreImages = images.length > 0 && page !== totalPages;

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      <Container>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ImageGallery
          images={images}
          onOpenModal={handleOpenModal}
        />
        {isLoading && <Loader />}
        {isMoreImages &&
          <Button
            text="Load more"
            onClick={handleLoadMore}
          />
        }
        {isShowModal &&
          <Modal
            handleCloseModal={handleCloseModal}
            image={largeImageURL}
            alt={tags}
          />
        }
      </Container>
    </>
  );
};

export default App;
