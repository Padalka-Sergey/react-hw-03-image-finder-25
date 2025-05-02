import React, { Component } from 'react';
import { fetchReq } from 'services/fetch-api';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
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

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchData } = this.props;

    if (prevProps.searchData !== searchData) {
      try {
        this.setState({ status: 'pending', page: 1 });
        const response = await fetchReq(searchData, page);
        this.setState({
          responseData: response.data.hits,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
    if (prevState.page !== page) {
      try {
        // this.setState({ status: 'pending', page: 1 });
        this.setState({ status: 'pendingBtn' });
        const response = await fetchReq(searchData, page);
        this.setState(prevState => {
          return {
            responseData: [...prevState.responseData, ...response.data.hits],

            status: 'resolved',
          };
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

    if (status === 'pendingBtn') {
      return (
        <>
          <GalleryList>
            <ImageGalleryItem responseData={responseData} />
          </GalleryList>
          <Loader />
          {/* <Button nextPageHandler={this.nextPageHandler} /> */}
        </>
      );
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

    if (status === 'resolved' && responseData.length > 0) {
      return (
        <>
          <GalleryList>
            <ImageGalleryItem responseData={responseData} />
          </GalleryList>
          <Button nextPageHandler={this.nextPageHandler} />
        </>
      );
    }
  }
}
