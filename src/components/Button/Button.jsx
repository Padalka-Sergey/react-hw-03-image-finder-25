import { Btn } from './Button.styled';

export const Button = ({ nextPageHandler }) => {
  return (
    <Btn type="button" onClick={nextPageHandler}>
      Load more
    </Btn>
  );
};
