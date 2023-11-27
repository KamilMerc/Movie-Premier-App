import React,  { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignIn = () => {

    const navigate = useNavigate()

    //useRef allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated
    const emailRef = useRef()
    const passwordRef  = useRef()

    const { signup } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false) //it is used to prevent multiple click sign up button when user is creating (preventing error occured)

    const goBack = () => {
        navigate(-1)
    }

    const submitForm = async(e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        }
        catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return(
        <div className="containermain">
            
                <p onClick={goBack} className="homePage">Back to previous page</p>
            
            <div className="formContainer">
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={submitForm} className="signUpForm">
                    <div id="email" className="formGroup">
                        <label className="signUpLabel" htmlFor="email">Email</label>
                        <input className="signUpInput" name="email" type="email" ref={emailRef} required/>
                    </div>
                    <div id="password" className="formGroup">
                        <label className="signUpLabel" htmlFor="password">Password</label>
                        <input className="signUpInput" name="password" type="password" ref={passwordRef} required/>
                    </div>
                    <button disabled={loading} type="submit" className="formSubmit">Sign In</button>
                </form>
                <p className="signIn">Don't have an account? <Link to={"/signup"} style={{textDecoration:"none",color:"white"}}><strong>Sign Up</strong></Link></p>
            </div>
        </div>
    )
}

export default SignIn