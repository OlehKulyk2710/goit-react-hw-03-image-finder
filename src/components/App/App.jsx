import { Component } from 'react';
import pixabayApi from '../services/pixabay_api';
import { Watch } from 'react-loader-spinner';
import { AppContainer } from './App.styled';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    isQueryCorrect: true,
    pageNumber: 1,
    totalPages: 0,
    data: [],
    btnState: false,
    error: '',
    isLoading: false,
    modalImage: '',
    isModalOpen: false,
  };

  onSubmit = async query => {
    if (query === this.state.query) return;

    await this.setState({ query, pageNumber: 1, data: [] });
    this.getApiData();
  };

  handleData = data => {
    const { total, hits } = data;
    const { pageNumber } = this.state;

    if (total === 0) {
      this.setState({ totalPages: total, isQueryCorrect: false });
    } else {
      this.setState({ totalPages: total, isQueryCorrect: true });
    }

    if (pageNumber === 1) {
      this.setState({ data: hits });
    } else {
      this.setState(prevState => ({
        data: [...prevState.data, ...hits],
      }));
    }

    setTimeout(() => this.handleBtnState(), 25);
  };

  handleBtnClick = async () => {
    await this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
    this.getApiData();
  };

  handleBtnState = () => {
    const { pageNumber, totalPages } = this.state;
    const pagesToShow = Math.ceil((totalPages - pageNumber * 12) / 12);
    pagesToShow >= 1
      ? this.setState({ btnState: true })
      : this.setState({ btnState: false });
  };

  handleModalState = (image = '') => {
    this.setState({ imageModal: image });
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  getApiData = async () => {
    const { query, pageNumber } = this.state;
    this.setState({ btnState: false, isLoading: true });

    try {
      const response = await pixabayApi({ query, pageNumber });
      response
        .json()
        .then(res => this.handleData(res))
        .finally(this.setState({ isLoading: false }));
    } catch (error) {
      console.log(error.message);
      this.setState({ error: 'Something went wrong', isLoading: false });
    }
  };

  render() {
    const {
      query,
      isQueryCorrect,
      data,
      btnState,
      error,
      isLoading,
      imageModal,
      isModalOpen,
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.onSubmit} />
        {error && <p>{this.state.error}</p>}
        {query && (
          <ImageGallery
            data={data}
            isQueryCorrect={isQueryCorrect}
            onModalState={this.handleModalState}
            isModalOpen={isModalOpen}
          />
        )}
        {btnState && <Button onBtnClick={this.handleBtnClick} />}
        {isLoading && (
          <Loader>
            <Watch color="#4d5eb3" />
          </Loader>
        )}
        {isModalOpen && (
          <Modal image={imageModal} onModalClose={this.handleModalState} />
        )}
      </AppContainer>
    );
  }
}
