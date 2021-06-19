import { createSlice } from '@reduxjs/toolkit'

const allArtworks = createSlice({
  name: 'allArtworks',
  initialState: {
    mongoId: null,
    artworkId: null,
    title: null,
    location: []
  },
  reducers: {
    setMongoId: (store, action) => {
      store.mongoId = action.payload
    },
    setArtworkId: (store, action) => {
      store.artworkId = action.payload
    },
    setTitle: (store, action) => {
      store.title = action.payload
    },
    setLocation: (store, action) => {
      store.location = action.payload
    }
  }
})

export default allArtworks