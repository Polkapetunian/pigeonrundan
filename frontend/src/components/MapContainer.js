import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styled from "styled-components/macro";

import artwork from "../reducers/artwork";
import allArtworks from "../reducers/allArtworks";
import { MAP_URL } from "../reusable/urls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;
//Don'd add padding to this container - destroys centering and navbar position

const MapContainer = () => {
  const [locations, setLocations] = useState([]);
  const currentCity = useSelector((store) => store.city.currentCity);
  console.log(currentCity);

  const dispatch = useDispatch();
  const history = useHistory();

  const mapStyles = {
    height: "75vh",
    width: "90%",
  };

  useEffect(() => {
    if (!currentCity) {
      history.push("/cities");
    }
    if (currentCity) {
      fetch(MAP_URL(currentCity.city))
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            console.log(data._id)
            batch(() => {
              //kan vi mappa och få ut bara array mede artwork?
            dispatch(allArtworks.actions.setMongoId(data._id))
            dispatch(allArtworks.actions.setArtworkId(data.id))
            dispatch(allArtworks.actions.setTitle(data.title))
            dispatch(allArtworks.actions.setLocation(data.location))
            })
            
          } else {
            console.log("Den gubben gick inte!")
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    currentCity && (
      <Container>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={currentCity.center}
          >
            {locations.map((item) => {
              return (
                <Marker
                  key={item.title}
                  position={item.location}
                  onClick={() =>
                    dispatch(artwork.actions.setArtworkId(item._id))
                  }
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </Container>
    )
  );
};

export default MapContainer;
