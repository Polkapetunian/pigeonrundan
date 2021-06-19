import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    userId: null,
    accessToken: null,
    errors: null,
    resolvedKarlstad: [],
    resolvedUppsala: []
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setResolvedKarlstad: (store, action) => {
      store.resolvedKarlstad = action.payload
    },
    setResolvedUppsala: (store, action) => {
      store.resolvedUppsala = action.payload
    }
  }
})

export default user