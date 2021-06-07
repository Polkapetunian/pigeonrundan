import { createSlice } from '@reduxjs/toolkit'

const artwork = createSlice({
  name: 'artwork',
  initialState: {
    artworkId: null,
  },
  reducers: {
    setArtworkId: (store, action) => {
      store.artworkId = action.payload
    }
  }
})

export default artwork