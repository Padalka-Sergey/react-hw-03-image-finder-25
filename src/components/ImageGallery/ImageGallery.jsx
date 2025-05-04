import React, { Component } from 'react';
import { fetchReq } from 'services/fetch-api';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  gallery = React.createRef();

  state = {
    responseData: [],
    page: 1,
    status: 'idle',
    error: null,
  };

  nextPageHandler = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  makeLowScroll = () => {
    const { page } = this.state;
    if (page === 1) {
      return;
    }
    const linkGallery = this.gallery.current;
    const { height } = linkGallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchData } = this.props;

    if (prevProps.searchData !== searchData) {
      if (searchData.trim() === '') {
        this.setState({ status: 'idleAlert' });
        return;
      }
      this.setState({ page: 1, status: 'pending' });
      // console.log(page);
      try {
        // const response = await fetchReq(searchData, page);
        const response = await fetchReq(searchData, 1);
        this.setState({
          responseData: response.data.hits,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    if (prevState.page !== page) {
      if (page === 1) {
        return;
      }
      // console.log('Изменилась страница');
      // console.log(page);
      this.setState({ status: 'pendingBtn' });
      try {
        // this.setState({ status: 'pending' });
        const response = await fetchReq(searchData, page);
        const responseAll = [...prevState.responseData, ...response.data.hits];

        const responseFilter = responseAll.filter(
          (item, idx, arr) =>
            idx === arr.findIndex(arrEl => arrEl.id === item.id)
        );

        this.setState({
          responseData: responseFilter,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { responseData, status, error } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved' && responseData.length === 0) {
      return (
        <h1
          style={{
            margin: '20px auto',
          }}
        >
          Картинки с именем {this.props.searchData} нет! :(
        </h1>
      );
    }

    if (status === 'idleAlert' && this.props.searchData.trim() === '') {
      return alert('Введите запрос!');
    }

    if (status === 'rejected') {
      return (
        <h1
          style={{
            margin: '20px auto',
          }}
        >
          {error.message}
        </h1>
      );
    }

    return (
      (status === 'resolved' || status === 'pendingBtn') && (
        // (status === 'resolved' || status === 'pending') && (
        <>
          <GalleryList ref={this.gallery} onLoad={this.makeLowScroll}>
            <ImageGalleryItem responseData={responseData} />
          </GalleryList>

          {responseData.length > 0 && status !== 'pendingBtn' && (
            // {responseData.length > 0 && status !== 'pending' && (
            <Button nextPageHandler={this.nextPageHandler} />
          )}
          {status === 'pendingBtn' && <Loader />}
          {/* {status === 'pending' && <Loader />} */}
        </>
      )
    );
  }
}
