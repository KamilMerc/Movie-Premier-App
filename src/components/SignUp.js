import React,  { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {

    //useRef allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated
    const emailRef = useRef()
    const passwordRef  = useRef()
    const passwordConfirmRef = useRef()

    const { signup } = useAuth()

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false) //it is used to prevent multiple click sign up button when user is creating (preventing error occured)


    const submitForm = async(e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        }
        catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return(
        <div className="containermain">
            
            <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
            
            <div className="formContainer">
                <h2>Sign Up</h2>
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
                    <div id="passwordConfirm" className="formGroup">
                        <label className="signUpLabel" htmlFor="passwordConfirm">Password Confirmation</label>
                        <input className="signUpInput" name="passwordConfirm" type="password" ref={passwordConfirmRef} required/>
                    </div>
                    <button disabled={loading} type="submit" className="formSubmit">Sign Up</button>
                </form>
                <p className="signIn">Already have an account? <Link to={"/signin"} style={{textDecoration:"none",color:"white"}}><strong>Sign In</strong></Link></p>
            </div>
        </div>
    )
}

export default SignUp