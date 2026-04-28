 import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Signin = () => {
    // adding state to all user inputs
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")
  const [loading, SetLoading] = useState('')
  const [error, SetError] = useState('')
  const navigate = useNavigate()
  // function to submit data to the database
   const submit = async (e) => {
    // preventing the default behaviour of the form loading
     e.preventDefault()
     // updating data into loading message
        SetLoading('please wait as we log you in')
        // updating data into the database
        try {
          // adding user inputs
          const data = new FormData()
          data.append('email', email)
          data.append('password', password)
          // connecting and posting to the database
          const response = await axios.post('http://gitongatruham.Alwaysdata.net/api/signin', data)
          // updating the loading message to empty
          SetLoading("")
          // checking if a user exist
          if (response.data.user){
            // storing the user in the browser local storage
            localStorage.setItem("user", JSON.stringify(response.data.user))
            // redirecting the logged in user to landing page
            navigate("/")
          }
          else{
            // error for log in failed
            SetError(response.data.message)
          }
 
        } catch (error) {
          // updating loading message to empty
          SetLoading("")
          // updating the error message
          SetError(error.response.data.message)
          
        }
   }
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className='signin-title'>Welcome Back</h2>
        <form action="" onSubmit={submit} className='signin-form'>
          {loading && <div className="alert-custom info">{loading}</div>}
          {error && <div className="alert-custom danger">{error}</div>}
          <div className="input-group">
            <input 
              type="email" 
              placeholder='Enter your email' 
              className='signin-input' 
              value={email} 
              onChange={(e) => SetEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder='Enter your password' 
              className='signin-input' 
              onChange={(e) => SetPassword(e.target.value)}
              required 
            />
          </div>
          <button className='signin-btn' type='submit'>
            Sign In
          </button>
          <p className='signin-link'>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signin
