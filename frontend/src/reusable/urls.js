const BASE_URL = "https://konstrundan.herokuapp.com/artworks/";

export const API_URL = (city) => `${BASE_URL}${city}`;

export const ARTWORK_URL = (city, id) => `${BASE_URL}${city}/${id}`;
