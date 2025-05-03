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
        this.setState({ status: 'pendingBtn' });
        const response = await fetchReq(searchData, page);
        const responseAll = [...prevState.responseData, ...response.data.hits];

        const responseFilter = responseAll.filter(
          (item, idx, arr) =>
            idx === arr.findIndex(arrEl => arrEl.id === item.id)
        );

        console.log(responseAll);
        console.log(responseFilter);
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
        <>
          <GalleryList>
            <ImageGalleryItem responseData={responseData} />
          </GalleryList>
          {responseData.length > 0 && status !== 'pendingBtn' && (
            <Button nextPageHandler={this.nextPageHandler} />
          )}
          {status === 'pendingBtn' && <Loader />}
        </>
      )
    );
  }
}
