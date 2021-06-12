import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MapContainer from './MapContainer'
import SelectedArtwork from './SelectedArtwork'

import artwork from '../reducers/artwork'

const Main = () => {
  const artworkId = useSelector((store) => store.artwork.artworkId)

  return (
    <BrowserRouter>
      <Container>
        <BottomNav destinations={destinations}/>
          <Switch>
            <Route>
              <MapContainer/>
            </Route>
            <Route>
              <SelectedArtwork/>
            </Route>
            <Route>
              <ProfilePage/>
            </Route>
            <Route>
              <Cities/>
            </Route>
          </Switch>
      </Container>
    </BrowserRouter>
  )
}
export default Main

//<div>
      {/* {artworkId && <SelectedArtwork/>}
      {!artworkId && <MapContainer/>} */}
    //</div>