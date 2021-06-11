import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import artwork from '../reducers/artwork'
import city from '../reducers/city'

const MapContainer = () => {

  const dispatch = useDispatch()
  const [locations, setLocations] = useState([])
  // const currentCity = useSelector((store) => store.city.currentCity)

  // console.log(currentCity)

  // const locations = [
  //   {
  //     "id": 1,
  //     "title": "Vargen",
  //     "artist": "Lennart Sand",
  //     "year": 1999,
  //     "location": {
  //      lat:59.3697610,
  //      lng:13.4867216
  //     },
  //     "clue": ""
  //   },
  //   {
  //     "id": 2,
  //     "title": "Dimman",
  //     "artist": "Gusten Lindberg",
  //     "year": 1937,
  //     "location": {
  //       lat:59.3766395,
  //       lng:13.4929866
  //     },
  //     "clue": ""
  //   },
  //   {
  //     "id": 3,
  //     "title": "Flottaren",
  //     "artist": "Solveig Nyqvist",
  //     "year": 2001,
  //     "location": {
  //       lat:59.3814502,
  //       lng:13.4872158
  //     },
  //     "clue": ""
  //   }]
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenterKarlstad = {
    lat: 59.402180, lng: 13.511498
  }

  const defaultCenterUppsala = {
    lat: 59.858562, lng: 17.638928
  }

  useEffect(() => {
    fetch("https://konstrundan.herokuapp.com/artworks/Karlstad/")
      .then((res) => res.json())
      .then(json => setLocations(json))  
  }, [])

   console.log(locations)
  
  return (
    <>
     <LoadScript
       googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenterKarlstad}>
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

export default MapContainer