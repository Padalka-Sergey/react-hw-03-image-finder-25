import { GalleryItem, ImgGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ responseData }) => {
  return responseData.map(({ id, webformatURL, tags }) => (
    <GalleryItem key={id}>
      <ImgGalleryItem src={webformatURL} alt={tags} />
    </GalleryItem>
  ));
};
