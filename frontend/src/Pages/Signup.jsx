import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const userData = {
      name,
      email,
      password
    }

    try {

      await axios.post(
        "http://localhost:8080/api/user/register",
        userData
      )

      alert("User Registered Successfully ✅")

      setName('')
      setEmail('')
      setPassword('')

      navigate("/login")

    } catch (error) {

      console.error(error)
      alert("Registration Failed ❌")

    }
  }

  return (
    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSubmit}>

        <h1>Signup</h1>

        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

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
          Signup
        </button>

        <p>
          Already have an account?
          <Link to='/login'> Login </Link>
        </p>

      </form>

    </div>
  )
}

export default Signup