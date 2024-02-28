import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Container from './Container/Container';
import Loader from './Loader/Loader';

import { getImages, PER_PAGE, responseImages } from '../api/API';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  searchImages = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isShowModal: false,
    });
  };

  async fetchImages() {
    try {
      this.setState({ isLoading: true });

      const { query, page } = this.state;
      const { hits, totalHits } = await getImages(query, page);
      const pictures = responseImages(hits);

      if (pictures.length === 0) {
        toast.warn('Images not found');
      }
      if (page === 1) {
        this.setState({ totalPages: Math.ceil(totalHits / PER_PAGE) });
      }
      this.setState(({ images }) => ({
        images: [...images, ...pictures],
      }));
    }
    catch (err) {
      this.setState({ error: err.message });
      toast.error('Something went wrong.');
    }
    finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleToggleModal = () => {
    this.setState(({ isShowModal }) => ({
        isShowModal: !isShowModal,
      }),
    );
  };

  handleModalClick = (largeImageURL, tags) => {
    this.setState({
      largeImageURL,
      tags,
    });
    this.handleToggleModal();
  };

  render() {
    const { searchImages, handleLoadMore, handleModalClick, handleToggleModal } = this;
    const { images, page, totalPages, isShowModal, largeImageURL, tags, isLoading } = this.state;
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
          {
            isShowModal &&
            <Modal
              handleModalClick={handleToggleModal}
              image={largeImageURL}
              alt={tags}
            />
          }
        </Container>
      </>
    );
  }
}

export default App;
