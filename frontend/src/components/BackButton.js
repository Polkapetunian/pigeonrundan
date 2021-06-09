import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = () => {
  
  return (
    <Link to='/'>
      <button>
        <p>Back</p>
      </button>
    </Link>
  )
}
export default BackButton