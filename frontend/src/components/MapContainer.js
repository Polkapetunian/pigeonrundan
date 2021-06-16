import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styled from "styled-components/macro";

import artwork from "../reducers/artwork";
import city from "../reducers/city";
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
        .then((json) => setLocations(json));
    }
  }, []);

  console.log(locations);

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
                    dispatch(artwork.actions.setArtworkId(item.id))
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
