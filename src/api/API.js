import axios from 'axios';

export const PER_PAGE = 12;

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: '30189799-59836afbb9e42d0c8f8f60963',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: PER_PAGE,
};

export const getImages = async (SearchQuery, page = 1) => {
  const { data } = await axios.get(`/?q=${SearchQuery}&page=${page}`);
  console.log(data);
  return data;
};

export const responseImages = data => {
  return data.map(({ id, largeImageURL, tags, webformatURL }) => ({
    id, largeImageURL, tags, webformatURL,
  }));
};
