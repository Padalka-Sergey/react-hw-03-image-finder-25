import React, { Component } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  render() {
    return (
      <AppContainer>
        <Searchbar />
        <ImageGallery />
      </AppContainer>
    );
  }
}
