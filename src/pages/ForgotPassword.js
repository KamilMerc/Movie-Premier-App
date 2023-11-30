import React,  { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {

    //useRef allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated
    const emailRef = useRef()

    const { resetpassword } = useAuth()

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false) //it is used to prevent multiple click sign up button when user is creating (preventing error occured)


    const submitForm = async(e) => {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetpassword(emailRef.current.value)
            setMessage("Check your email for further information")
        }
        catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }


    return(
        <div className="containermain">
            
            <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
            
            <div className="formContainer">
                <h2>Reset Password</h2>
                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
                <form onSubmit={submitForm} className="signUpForm">
                    <div id="email" className="formGroup">
                        <label className="signUpLabel" htmlFor="email">Email</label>
                        <input className="signUpInput" name="email" type="email" ref={emailRef} required/>
                    </div>
                    <button disabled={loading} type="submit" className="formSubmit">Reset Password</button>
                </form>
                <Link to={"/signin"} style={{textDecoration:"none",color:"white"}}><p className="forgotpass">Sign In</p></Link>
                <p className="signIn">Don't have an account? <Link to={"/signup"} style={{textDecoration:"none",color:"white"}}><strong>Sign Up</strong></Link></p>
            </div>
        </div>
    )
}

export default ForgotPassword