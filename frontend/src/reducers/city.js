import { createSlice } from '@reduxjs/toolkit'

const city = createSlice({
  name: 'city',
  initialState: {
    currentCity: null,
  },
  reducers: {
    setCurrentCity: (store, action) => {
      store.currentCity = action.payload
    }
  }
})

export default city