import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 40px;
`;

const ProfilePage = () => {
  const username = useSelector((store) => store.user.username)
return(
  <Container>
    <p>Välkommen {username}!</p>
    <p>Profilsida</p>
  </Container>
)  
  
}

export default ProfilePage