import React from "react"
import axios from 'axios'

import useInput from '../hooks/useInput'

const Login = props => {
  const initialState = {
    username: '',
    password: ''
  }
  
  const [login,, handleChange] = useInput(initialState)
  
  const handleSubmit = ev => {
    ev.preventDefault()
    axios.post('http://localhost:5000/api/login', login)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="username" 
          type="text"
          placeholder="username"
          value={login.username}
          onChange={handleChange}
        />
        <input 
          name="password" 
          type="password"
          placeholder="password"
          value={login.password}
          onChange={handleChange}
        />
        <button role="submit">Login</button>
      </form>
    </>
  )
}

export default Login
