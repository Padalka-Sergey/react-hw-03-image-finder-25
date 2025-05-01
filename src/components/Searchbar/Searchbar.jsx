import React, { Component } from 'react';

import { SearchbarBox, Form, BtnForm, InputForm } from './Searchbar.styled';

export class Searchbar extends Component {
  //   state = {
  //     searchName: '',
  //   };

  onSubmitHandler = e => {
    const { input } = e.target.elements;
    e.preventDefault();
    // this.setState({ searchName: input.value });
    this.props.submitHandler(input.value);
    input.value = '';
  };

  render() {
    return (
      <SearchbarBox>
        <Form onSubmit={this.onSubmitHandler}>
          <BtnForm type="submit" />
          <InputForm
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarBox>
    );
  }
}
