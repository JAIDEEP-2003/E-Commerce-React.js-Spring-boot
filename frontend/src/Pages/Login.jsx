import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {

    e.preventDefault()

    const loginData = {
      email,
      password
    }

    try {

      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        loginData
      )

      alert("Login Successful ✅")

      console.log(response.data)

      // Store user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      )

      // ✅ VERY IMPORTANT
      localStorage.setItem("isLoggedIn", "true");

      navigate('/home')

    } 
    catch (error) {

      console.error(error)

      alert("Login Failed ❌")

    }
  }

  return (

    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type='submit'>
          Login
        </button>

        <p>
          Don't have an account?
          <Link to='/signup'> Signup </Link>
        </p>

      </form>

    </div>

  )
}

export default Login