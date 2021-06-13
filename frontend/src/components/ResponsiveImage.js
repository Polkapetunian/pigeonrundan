import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
border: 6px solid #E8DACF;
outline: 4px solid #4B3D2D;
&::before {
  background: none;
  border: 4px solid #4B3D2D;
  content:"";
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  z-index: 1;
}
  @media (max-width: 767px) {
    width: 320px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 400px;
  }
  @media (min-width: 1025px) {
    width: 640px;
  }
`

const ResponsiveImage = ({imgSrcMob, imgSrcTabl, imgSrcDesk}) => {
  return(
    <Image src={imgSrcMob} srcSet={`${imgSrcMob} 320w, ${imgSrcTabl} 400w, ${imgSrcDesk} 640w`} /> 
    
  )
}

export default ResponsiveImage