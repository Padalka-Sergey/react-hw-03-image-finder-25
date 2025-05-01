import React, { Component } from 'react';
import { fetchReq } from 'services/fetch-api';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    responseData: [],
    page: 1,
    status: 'idle',
    error: null,
  };
  async componentDidUpdate(prevProps) {
    const { page } = this.state;
    if (prevProps.searchData !== this.props.searchData) {
      try {
        this.setState({ status: 'pending' });
        const response = await fetchReq(this.props.searchData, page);
        this.setState({
          responseData: response.data.hits,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }
  render() {
    const { status, error } = this.state;

    if (status === 'pending') {
      return <p>Loading...</p>;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <GalleryList>
          <ImageGalleryItem responseData={this.state.responseData} />
        </GalleryList>
      );
    }
  }
}
