import React,  { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignIn = () => {

    //useRef allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated
    const emailRef = useRef()
    const passwordRef  = useRef()

    const { signin, googlesignin } = useAuth()

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false) //it is used to prevent multiple click sign up button when user is creating (preventing error occured)


    const submitForm = async(e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        }
        catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    const googleSignIn = async() => {
        try {
            setError("")
            await googlesignin()
            navigate("/")
        }
        catch {
            setError("Failed to sign in")
        }
    }

    return(
        <div className="containermain">
            
            <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
            
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
                    <p className="googlesignin" onClick={googleSignIn}>Sign In with Google</p>
                    <button disabled={loading} type="submit" className="formSubmit">Sign In</button>
                </form>
                <Link to={"/forgetpassword"} style={{textDecoration:"none",color:"white"}}><p className="forgotpass">Forgot password?</p></Link>
                <p className="signIn">Don't have an account? <Link to={"/signup"} style={{textDecoration:"none",color:"white"}}><strong>Sign Up</strong></Link></p>
            </div>
        </div>
    )
}

export default SignIn