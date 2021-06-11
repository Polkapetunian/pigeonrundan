import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import Cities from './components/Cities'

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
            <Route exact path="/" component={Cities} />
            <Route exact path="/map" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register}/>
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  )
}
