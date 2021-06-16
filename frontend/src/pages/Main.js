import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'

import MapContainer from '../components/MapContainer'
import SelectedArtwork from './SelectedArtwork'
import ProfilePage from './ProfilePage'
import Cities from './Cities'
import NavBar from '../components/Navbar'

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin:0;
  `

const Main = () => {
  const artworkId = useSelector((store) => store.artwork.artworkId)

  const destinations = [
    {
      title: "Karta",
      iconSrc: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
        </svg>
      ),
      slug: "/map"
    },
    {
      title: "Byta stad",
      iconSrc: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-signpost-split" viewBox="0 0 16 16">
          <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z"/>
        </svg>
      ),
      slug: "/cities"
    },
    {
      title: "Min sida",
      iconSrc: (
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
      ),
      slug: "/min-sida"
    },
    {
      title: "Logga ut",
      iconSrc: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
      ),
      slug: "/login"
    },
  ]

  return (
    <BrowserRouter>
      <Container>
        <NavBar destinations = {destinations} />
          <Switch>
            <Route path="/map">
            {artworkId && <SelectedArtwork/>}
            {!artworkId && <MapContainer/>} 
            </Route>
            <Route path="/min-sida">
              <ProfilePage/>
            </Route>
            <Route path="/cities">
              <Cities/>
            </Route>
          </Switch>
      </Container>
    </BrowserRouter>
  )
}
export default Main