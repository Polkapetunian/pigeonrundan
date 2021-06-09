import React from 'react'
import { useDispatch } from 'react-redux'

import city from '../reducers/city'

const dispatch = useDispatch()

const Cities = () => {

  return(
    <div>
      <p>Välj stad!</p>
      <button onClick={() => dispatch(city.actions.setCity(Karlstad))}>
        Karlstad
      </button>
      <button onClick={() => dispatch(city.actions.setCity(Uppsala))}>
        Uppsala
      </button>
    </div>
  )
}
export default Cities