import React, { Component } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.onPressEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onPressEsc);
  }

  render() {
    const { largeImageURL, tags, closeModal } = this.props;
    return (
      <Overlay onClick={closeModal}>
        <ModalEl>
          <img src={largeImageURL} alt={tags} />
        </ModalEl>
      </Overlay>
    );
  }
}
