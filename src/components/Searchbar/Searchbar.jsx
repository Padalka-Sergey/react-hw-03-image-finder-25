import {
  SearchbarBox,
  Form,
  BtnForm,
  //   BtnLabel,
  InputForm,
} from './Searchbar.styled';

export const Searchbar = () => {
  return (
    <SearchbarBox>
      <Form>
        <BtnForm type="submit" />
        <InputForm
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarBox>
  );
};
