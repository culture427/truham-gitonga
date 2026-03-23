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
        // prevents the page from reloading before the data is saved in the database
        e.preventDefault()
        SetLoading('please wait as we upload your data')
        // sending user inputs to the database
        try { 
            const data = new FormData()
            // appending data to the FormData variable
            data.append('username', username)
            data.append('email', email)
            data.append('password', password)
            data.append('phone', phone)
            // using axios to post our data to the database
            const response = await axios.post ('http://gitongatruham.alwaysdata.net/api/signup' , data)
            // removing the loading message by setting it to empty
            SetLoading('')
            // adding success message after successful data posting in the database
            SetSuccess(response.data.message)
            // clearing the form fields making the work easy for the user
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
        <div className="row mt-4 justify-content-center bg-dark">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign Up</h2>
                <form action="" onSubmit={submit} className="bg-dark">
                  . {loading}
                    {success}
                    {error}
                    <input type="text" placeholder="enter your username" className="form-control" value={username} onChange={(e) => SetUsername(e.target.value)}
                    required/><br /><br />
                    <input type=" email" placeholder="enter email"  className="form-control" value={email} onChange={(e) => SetEmail(e.target.value)}
                    required/><br /> 
                    <input type="password" placeholder="enter password"  className="form-control" onChange={(e) => SetPassword(e.target.value)}
                    required/><br />
                    <input type="tel" placeholder="enter phone" className="form-control" value={phone} onChange={(e) => SetPhone(e.target.value)}
                    required /><br />
                    <button className="btn btn-primary"  type="submit">
                        sign up
                    </button>
                    <p>Already have an account? <Link to="/signin"><i>sign in</i></Link></p>

                </form>
            </div>
        </div>
    )
}

export default Signup
