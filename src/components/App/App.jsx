import React, { Component } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchReq } from 'services/fetch-api';

export class App extends Component {
  state = {
    searchData: '',
    page: 1,
    responseData: [],
    isLoading: false,
    error: null,
  };

  formSubmitHandler = data => {
    this.setState({ searchData: data });
  };

  async componentDidUpdate(_, prevState) {
    const { searchData, page } = this.state;
    if (prevState.searchData !== searchData) {
      try {
        this.setState({ isLoading: true });
        const response = await fetchReq(searchData, page);
        this.setState({
          responseData: response.data.hits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    return (
      <AppContainer>
        <Searchbar submitHandler={this.formSubmitHandler} />

        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <ImageGallery responseData={this.state.responseData} />
        )}

        {/* {this.state.responseData.length > 0 && (
          <ImageGallery responseData={this.state.responseData} />
        )} */}
      </AppContainer>
    );
  }
}
