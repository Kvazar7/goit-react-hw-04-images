const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33569562-dd32e440d8f662096afc537ab';

const perPage = 12;
const orientation = 'horizontal';
const image_type = 'photo';
const safesearch = true;

export const getDataImg = (searchText, page) => {
    return fetch(
        `${BASE_URL}/?key=${API_KEY}&q=${searchText}&per_page=${perPage}&page=${page}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`
    );
};
