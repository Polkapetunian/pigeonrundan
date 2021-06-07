import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import dotenv from 'dotenv'

dotenv.config()

const MapContainer = () => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 59.402180, lng: 13.511498
  }
  
  return (
     <LoadScript
       googleMapsApiKey={process.env.API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default MapContainer;