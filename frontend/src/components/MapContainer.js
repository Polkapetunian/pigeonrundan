import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

import artwork from '../reducers/artwork'

const MapContainer = () => {

  const [ selected, setSelected ] = useState({})

  // const [ answer, setAnswer ] = useState('')

  const dispatch = useDispatch()

  const onSelect = item => {
    setSelected(item)
    dispatch(artwork.actions.setArtworkId(selected.id))
  }

  // const onAnswer = (event) => {
  //   setAnswer(event.target.value)
  // }

  // const onFormSubmit = (event) => {
  //   event.preventDefaut()
  // }

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
              onClick={() => onSelect(item)}
            />
                )
              })
            }
            {/* {
              selected.location &&
              (
                <InfoWindow
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
                >
                  <p>{selected.title}</p>
                  <form onSubmit={onFormSubmit}>
                    <label>
                      <input 
                      type="text"
                      maxLength="1"
                      value={answer}
                      onChange={onAnswer}/>
                    </label>
                  </form>
                </InfoWindow>
              )
            } */}
          </GoogleMap>
     </LoadScript>
     </>
  )
}

export default MapContainer;