import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import styled from 'styled-components'

import artwork from '../reducers/artwork'
import city from '../reducers/city'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`
//Don'd add padding to this container - destroys centering and navbar position

const MapContainer = () => {

  const dispatch = useDispatch()
  const [locations, setLocations] = useState([])
  
  const mapStyles = {        
    height: "75vh",
    width: "90%"};
  
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
    <Container>
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
    </Container>
  )
}

export default MapContainer