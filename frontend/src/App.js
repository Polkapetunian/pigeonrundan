import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Icon } from "leaflet"

export const App = () => {
  return (
    <div>
      <MapContainer center={[59.402180, 13.511498 ]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  )
}
