const BASE_URL = 'https://konstrundan.herokuapp.com/artworks/'


export const API_URL = (slug) => `${BASE_URL}${slug}`

export const ARTWORK_URL = (slug) => `${API_URL}/${slug}`