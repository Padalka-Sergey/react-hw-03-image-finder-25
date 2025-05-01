import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ responseData }) => {
  return (
    <GalleryList>
      <ImageGalleryItem responseData={responseData} />
    </GalleryList>
  );
};
