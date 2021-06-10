import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BackButton from './BackButton'

import { ARTWORK_URL } from '../reusable/urls'

import artwork from '../reducers/artwork'

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

  return ( 
    selectedArtwork &&
    <div>
      <BackButton/>
     <p>{artworkId}</p>
     <p>{selectedArtwork.title}</p>
     <p>{selectedArtwork.year}</p>
     <p>{selectedArtwork.clue}</p>
      <form>
        <label> Bokstav:
          <input
          type= "text"> 
          </input>
        </label>
      </form>
    </div>
  )
}
export default SelectedArtworks