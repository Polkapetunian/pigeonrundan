import React from 'react'
import { useDispatch } from 'react-redux'
import styled from "styled-components/macro"

import artwork from '../reducers/artwork'

const Button = styled.button`
background-color: #f1dbb3; 
border: 1px solid #4B3D2D;
color: #4B3D2D;
padding: 5px 5px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
font-weight: 700;
margin:0 0 20px 20px;
align-self: flex-start;
`
const BackButton = () => {
  const dispatch = useDispatch()

  return (
    <Button onClick={() => dispatch(artwork.actions.setArtworkId(null))} >
    Tillbaka
    </Button>
  )
}
export default BackButton