import React from 'react'
import { useDispatch } from 'react-redux'

import artwork from '../reducers/artwork'

const BackButton = () => {
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(artwork.actions.setArtworkId(null))} >
      <p>Tillbaka</p>
    </button>
  )
}
export default BackButton