import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import artwork from '../reducers/artwork'

const MapContainer = () => {

  const dispatch = useDispatch()

  const locations = [
    {
      "id": 1,
      "title": "Vargen",
      "artist": "Lennart Sand",
      "year": 1999,
      "location": {
       lat:59.3697610,
       lng:13.4867216
      },
      "clue": ""
    },
    {
      "id": 2,
      "title": "Dimman",
      "artist": "Gusten Lindberg",
      "year": 1937,
      "location": {
        lat:59.3766395,
        lng:13.4929866
      },
      "clue": ""
    },
    {
      "id": 3,
      "title": "Flottaren",
      "artist": "Solveig Nyqvist",
      "year": 2001,
      "location": {
        lat:59.3814502,
        lng:13.4872158
      },
      "clue": ""
    }]
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 59.402180, lng: 13.511498
  }
  
  return (
    <>
     <LoadScript
       googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
        {
          locations.map(item => {
            return(
            <Marker
              key={item.title}
              position={item.location}
              onClick={() => dispatch(artwork.actions.setArtworkId(item.id))}
            />
                )
              })
            }
          </GoogleMap>
     </LoadScript>
     </>
  )
}

export default MapContainer;