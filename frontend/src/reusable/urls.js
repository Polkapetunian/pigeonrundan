const BASE_URL = "https://konstrundan.herokuapp.com/";

export const USER_URL = (mode) => `${BASE_URL}${mode}`

export const MAP_URL = (city) => `${BASE_URL}artworks/${city}`;

export const ANSWER_URL = (city) => `${BASE_URL}resolved-artworks/${city}`

export const ARTWORK_URL = (city, id) => `${BASE_URL}artworks/${city}/${id}`;

export const RESOLVED_URL = (city, user) => `${BASE_URL}resolved-artworks/${city}/${user}`
