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
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  console.log(query);

  // state = {
  //   images: [],
  //   query: '',
  //   page: 1,
  //   isLoading: false,
  //   error: null,
  //   largeImageURL: '',
  //   tags: '',
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   const { page, query } = this.state;
  // }

  const searchImages = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsShowModal(false);
    // query,
    // images: [],
    // page: 1,
    // isShowModal: false,
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
        setError(err.message);
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

  const handleModalClick = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    handleToggleModal();
  };

  // const { searchImages, handleLoadMore, handleModalClick, handleToggleModal } = this;
  // const { images, page, totalPages, isShowModal, largeImageURL, tags, isLoading } = this.state;

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
          onOpenModal={handleModalClick}
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
            handleModalClick={handleToggleModal}
            image={largeImageURL}
            alt={tags}
          />
        }
      </Container>
    </>
  );
};


export default App;
