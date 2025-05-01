import axios from 'axios';

export const fetchReq = (searchData, page) => {
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const API_KEY = '31316386-df3d7a07dab36b9800dfb8d2b';

  return axios.get(
    `?key=${API_KEY}&q=${searchData}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
