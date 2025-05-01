import React, { Component } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchData: '',
    // page: 1,
    // responseData: [],
    // isLoading: false,
    // error: null,
  };

  formSubmitHandler = data => {
    this.setState({ searchData: data });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar submitHandler={this.formSubmitHandler} />
        <ImageGallery searchData={this.state.searchData} />
        {/* {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <ImageGallery responseData={this.state.responseData} />
        )} */}
      </AppContainer>
    );
  }
}
