import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import city from '../reducers/city'




const Cities = () => {
  const dispatch = useDispatch()

  const city1 = "Karlstad"
  const city2 = "Uppsala"

  // useEffect(() => {
  //   if (city !== null) {
  //     history.push('/map')
  //   }
  // }, [city, history])

  return(
    <div>
      <p>Välj stad!</p>
      <Link to="/">
      <button onClick={() => dispatch(city.actions.setCurrentCity(city1))}>
        Karlstad
      </button>
      </Link>
      <Link to="/">
      <button onClick={() => dispatch(city.actions.setCurrentCity(city2))}>
        Uppsala
      </button>
      </Link>
    </div>
  )
}
export default Cities