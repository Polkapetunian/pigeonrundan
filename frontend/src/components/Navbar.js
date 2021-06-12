import React from "react";
import styled from "styled-components/macro";

import DestinationLink from "./DestinationLink";

const Container = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  background-color: #EAD8C6;
  padding: 10px;
  box-sizing: border-box;
  color: white;
`;

const Navbar = ({ destinations }) => {
  return (
    <Container>
      {destinations.map((destination) => (
        <DestinationLink
          key={destination.title}
          title={destination.title}
          iconSrc={destination.iconSrc}
          slug={destination.slug}
        />
      ))}
    </Container>
  );
};
export default Navbar;
