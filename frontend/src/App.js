import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Icon } from "leaflet"

import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'


export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
