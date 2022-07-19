const API_KEY = '27709909-07a568606c22c989f1d028a2c';
const URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

function pixabayApi(data) {
  const { query, pageNumber } = data;
  return fetch(
    `${URL}?key=${API_KEY}&q=${query}&page=${pageNumber}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
}

export default pixabayApi;
