import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'

import user from './reducers/user'
import artwork from './reducers/artwork'

const reducer = combineReducers({
  user: user.reducer,
  artwork: artwork.reducer
})
const store = configureStore({ reducer })
export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register}/>
            <Route exact path="/map" component={Main} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  )
}
