import React, { Component } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchData: null,
  };

  formSubmitHandler = data => {
    this.setState({ searchData: data });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar submitHandler={this.formSubmitHandler} />
        <ImageGallery searchData={this.state.searchData} />
      </AppContainer>
    );
  }
}
