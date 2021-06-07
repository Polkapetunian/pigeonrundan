import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer,
})
const store = configureStore({ reducer })
export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  )
}
