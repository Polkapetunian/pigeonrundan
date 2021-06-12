import React, { useState } from 'react'

import Form from './Form'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="path-container">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        mode="users"
        title="Register"
        link="/login"
        linkDescription="Already signed up? Log in here!"
      />
    </div>
  )
}
export default Register