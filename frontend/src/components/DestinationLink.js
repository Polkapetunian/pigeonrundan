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
    color: #8080ff;
    text-decoration: none;
  }
  a:visited {
    color: #8080ff;
    text-decoration: none;
  }
  a:hover {
    color: #8080ff;
  }
  a:active {
    color: white;
  }
`;

const Title = styled.p`
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
`;

const DestinationLink = ({ title, iconSrc, slug }) => {
  return (
    <Container>
      <NavLink exact to={slug} activeStyle={{ color: "white" }}>
        {iconSrc}
        <Title>{title}</Title>
      </NavLink>
    </Container>
  );
};
export default DestinationLink;
