import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// import dotenv from 'dotenv'

// dotenv.config()

const MapContainer = () => {

  const locations = [
    {
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
     <LoadScript
       googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
        {
          locations.map(item => {
            return(
            <Marker key={item.title} position={item.location}/>
                )
              })
            }
          </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;