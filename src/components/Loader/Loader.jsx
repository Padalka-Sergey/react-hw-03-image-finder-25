import { RotatingLines } from 'react-loader-spinner';
import { LoaderBox } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderBox>
      <RotatingLines
        visible={true}
        height="70"
        width="70"
        color="grey"
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoaderBox>
  );
};
