import React, { Component } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchData: null,
  };

  formSubmitHandler = data => {
    // console.dir(ImageGallery);
    this.setState({ searchData: data });
  };

  // makeLowScroll = () => {
  //   const { height } = ImageGallery.firstElementChild.getBoundingClientRect();

  //   window.scrollBy({
  //     top: height * 2,
  //     behavior: 'smooth',
  //   });
  // };

  render() {
    return (
      <AppContainer>
        <Searchbar submitHandler={this.formSubmitHandler} />
        <ImageGallery searchData={this.state.searchData} />
      </AppContainer>
    );
  }
}
