import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ARTWORK_URL } from '../reusable/urls'

import artwork from '../reducers/artwork'

const SelectedArtworks = () => {
  const artworkId = useSelector((store) => store.artwork.artworkId)
  const [selectedArtwork, setSelectedArtwork] = useState({})

  const dispatch = useDispatch()

    useEffect(() => {
      fetch(`https://konstrundan.herokuapp.com/artworks/Karlstad/${artworkId}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(artwork.actions.setSelectedArtwork(data))
          console.log(data)
        });
        
    })

    //ARTWORK_URL(artworkId)


  return (
    <div>
      <p>Titel:{selectedArtwork.title}</p>
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