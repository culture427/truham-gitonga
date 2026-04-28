 import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Signup = () => {
   // adding state to all user inputs
    const [username, SetUsername] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [phone, SetPhone] = useState("")
    // states for success error and loading messages
    const [loading, SetLoading] = useState('')
     const [success, SetSuccess] = useState('')
      const [error, SetError] = useState('')
    //   function to post user inputs in the database
    const submit = async (e) => {
        e.preventDefault()
        SetLoading('please wait as we upload your data')
        try { 
            const data = new FormData()
            data.append('username', username)
            data.append('email', email)
            data.append('password', password)
            data.append('phone', phone)
            const response = await axios.post ('http://gitongatruham.alwaysdata.net/api/signup' , data)
            SetLoading('')
            SetSuccess(response.data.message)
            SetUsername('')
            SetEmail('')
            SetPassword('')
            SetPhone('')
        } catch (error) {
            SetLoading('')
            SetError(error.message)
        }
    }
    return(
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create Account</h2>

                <form action="" onSubmit={submit} className="signup-form">

                  {loading && <div className="alert-custom info">{loading}</div>}
                  {success && <div className="alert-custom success">{success}</div>}
                  {error && <div className="alert-custom danger">{error}</div>}

                  <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Enter your username" 
                        className="signup-input" 
                        value={username} 
                        onChange={(e) => SetUsername(e.target.value)}
                        required
                    />
                  </div>

                  <div className="input-group">
                    <input 
                        type="email" 
                        placeholder="Enter email"  
                        className="signup-input" 
                        value={email} 
                        onChange={(e) => SetEmail(e.target.value)}
                        required
                    />
                  </div>

                  <div className="input-group">
                    <input 
                        type="password" 
                        placeholder="Enter password"  
                        className="signup-input" 
                        onChange={(e) => SetPassword(e.target.value)}
                        required
                    />
                  </div>

                  <div className="input-group">
                    <input 
                        type="tel" 
                        placeholder="Enter phone" 
                        className="signup-input" 
                        value={phone} 
                        onChange={(e) => SetPhone(e.target.value)}
                        required 
                    />
                  </div>

                    <button className="signup-btn" type="submit">
                        Sign Up
                    </button>

                    <p className="signup-link">
                        Already have an account? 
                        <Link to="/signin">Sign in</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup