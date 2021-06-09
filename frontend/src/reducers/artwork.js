import { createSlice } from '@reduxjs/toolkit'

const artwork = createSlice({
  name: 'artwork',
  initialState: {
    selectedArtwork: null,
    artworkId: null,
  },
  reducers: {
    setArtworkId: (store, action) => {
      store.artworkId = action.payload
    },
    setSelectedArtwork: (store, action) => {
      store.selectedArtwork = action.payload
    }
  }
})

export default artwork