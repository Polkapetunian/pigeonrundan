import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import  { API_URL } from '../reusable/urls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (event) => {event.preventDefault()

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }
    fetch(API_URL('users'), config)
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Användarnamn:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
      </label>
      <label>
        E-post:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </label>
      <label>
        Lösenord:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </label>
      {errors && <p>{errors.message}</p>}
      <button className="button" type="submit">Logga in</button>
    </form>
  )
}

export default Login