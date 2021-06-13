import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  a:link {
    color: #4B3D2D;
    text-decoration: none;
  }
  a:visited {
    color: #4B3D2D;
    text-decoration: none;
  }
  a:hover {
    color: #8a745c;
  }
  a:active {
    color: white;
  }
`;

const InnerContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Title = styled.p`
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
`;

const DestinationLink = ({ title, iconSrc, slug }) => {
  return (
    <Container>
      <NavLink exact to={slug} activeStyle={{ color: "#8D4807" }}>
        <InnerContainer>
        {iconSrc}
        <Title>{title}</Title>
        </InnerContainer>
      </NavLink>
    </Container>
  );
};
export default DestinationLink;
