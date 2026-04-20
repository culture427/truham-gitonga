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
        <div className="row mt-5 justify-content-center">
            <div className="col-md-5 card shadow p-4">
                <h2 className="text-center text-primary mb-3">Sign Up</h2>

                <form action="" onSubmit={submit}>

                  <p className="text-info text-center">{loading}</p>
                  <p className="text-success text-center">{success}</p>
                  <p className="text-danger text-center">{error}</p>

                    <input 
                        type="text" 
                        placeholder="enter your username" 
                        className="form-control mb-3" 
                        value={username} 
                        onChange={(e) => SetUsername(e.target.value)}
                        required
                    />

                    <input 
                        type=" email" 
                        placeholder="enter email"  
                        className="form-control mb-3" 
                        value={email} 
                        onChange={(e) => SetEmail(e.target.value)}
                        required
                    /> 

                    <input 
                        type="password" 
                        placeholder="enter password"  
                        className="form-control mb-3" 
                        onChange={(e) => SetPassword(e.target.value)}
                        required
                    />

                    <input 
                        type="tel" 
                        placeholder="enter phone" 
                        className="form-control mb-3" 
                        value={phone} 
                        onChange={(e) => SetPhone(e.target.value)}
                        required 
                    />

                    <button className="btn btn-primary w-100" type="submit">
                        sign up
                    </button>

                    <p className="text-center mt-3">
                        Already have an account? 
                        <Link to="/signin"><i> sign in</i></Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup