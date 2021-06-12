import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import ResponsiveImage from '../components/ResponsiveImage'
import BackButton from '../components/BackButton'

import { ARTWORK_URL } from '../reusable/urls'
import artwork from '../reducers/artwork'

const Container = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Text = styled.p`
  width: 80%;
`


const SelectedArtworks = () => {
  const artworkId = useSelector((store) => store.artwork.artworkId)
  const selectedArtwork = useSelector((store) => store.artwork.selectedArtwork)

  const dispatch = useDispatch()

    useEffect(() => {
      fetch(`https://konstrundan.herokuapp.com/artworks/Karlstad/${artworkId}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(artwork.actions.setSelectedArtwork(data))
         
        })
        
    }, [])

    //`${ARTWORK_URL}/${artworkId}`

    // const picSmall = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_n.jpg"
    // const picMedium = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_z.jpg"
    // const picLarge = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_c.jpg"

    // const breakPointSmall = "(min-width: 1025px)"
    // const breakPointMedium = "(max-width: 1024px)"
    // const breakPointLarge = "(max-width: 767px)"

  return ( 
    selectedArtwork &&
    <Container>
      <BackButton/>
     <p>{artworkId}</p>
     <ResponsiveImage/>
     <Text>{selectedArtwork.title}</Text>
     <Text>{selectedArtwork.year}</Text>
     <Text>{selectedArtwork.clue}</Text>
      <form>
        <label> Bokstav:
          <input
          type= "text"> 
          </input>
        </label>
      </form>
    </Container>
  )
}
export default SelectedArtworks
