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

    const picSmall = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_n.jpg"
    const picMedium = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_z.jpg"
    const picLarge = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_c.jpg"

  return ( 
    selectedArtwork &&
    <div>
      <BackButton/>
     <p>{artworkId}</p>
     <picture> 	
      <source srcSet={picSmall} media="(min-width: 1025px)"/>
      <source srcSet={picMedium} media="(max-width: 1024px)"/>
      <source srcSet={picLarge} media="(max-width: 767px)"/>
      <img src={picSmall} alt=""/> 
    </picture> 
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
