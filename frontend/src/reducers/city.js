import { createSlice } from '@reduxjs/toolkit'

const city = createSlice({
  name: 'city',
  initialState: {
    city: null,
  },
  reducers: {
    setCity: (store, action) => {
      store.city = action.payload
    }
  }
})

export default city