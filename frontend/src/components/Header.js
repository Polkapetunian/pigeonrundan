import React from 'react'
import styled from "styled-components/macro"

const Container = styled.nav`
  width: 100%;
  position: fixed;
  justify-items: center;
  color: #463727;
  background-color: #f1dbb3;
  box-sizing: border-box;
  font-family: 'Viaoda Libre', cursive;
  font-size: 30px;
  padding-left: 10px;
  margin:0;
`

const MainHeader = styled.h1`
  margin: 0;
`

const Header = () => {
  return (
    <Container>
      <MainHeader>KonstRundan</MainHeader>
    </Container>
  )
}

export default Header

