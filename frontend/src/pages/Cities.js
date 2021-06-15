import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import city from "../reducers/city";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Cities = () => {
  const dispatch = useDispatch();

  const cities = [
    {
      city: "Karlstad",
      center: {
        lat: 59.40218,
        lng: 13.511498,
      },
    },
    {
      city: "Uppsala",
      center: {
        lat: 59.858562,
        lng: 17.638928,
      },
    },
  ];

  // useEffect(() => {
  //   if (city !== null) {
  //     history.push('/map')
  //   }
  // }, [city, history])

  return (
    <Container>
      <p>Välj stad!</p>

      {cities.map((singleCity) => (
        <Link to="/map">
          <  button key={city}
            onClick={() => dispatch(city.actions.setCurrentCity(singleCity))}
          >
            {singleCity.city}
          </button>
        </Link>
      ))}
      {/* <Link to="/map">
      <button onClick={() => dispatch(city.actions.setCurrentCity("Karlstad"))}>
        Karlstad
      </button>
      </Link>
      <Link to="/map">
      <button onClick={() => dispatch(city.actions.setCurrentCity(city2))}>
        Uppsala
      </button>
      </Link> */}
    </Container>
  );
};
export default Cities;
