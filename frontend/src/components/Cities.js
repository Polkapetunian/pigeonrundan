import React from 'react'
import { useDispatch } from 'react-redux'

import city from '../reducers/city'

const dispatch = useDispatch()
const city1 = "Karlstad"
const city2 = "Uppsala"

const Cities = () => {

  return(
    <div>
      <p>Välj stad!</p>
      <button onClick={() => dispatch(city.actions.setCity(city1))}>
        Karlstad
      </button>
      <button onClick={() => dispatch(city.actions.setCity(city2))}>
        Uppsala
      </button>
    </div>
  )
}
export default Cities