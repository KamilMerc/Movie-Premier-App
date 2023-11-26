import React,  { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef  = useRef()
    const passwordConfirmRef = useRef()

    const goBack = () => {
        navigate(-1)
    }

    return(
        <div className="containermain">
            
                <p onClick={goBack} className="homePage">Back to previous page</p>
            
            <div className="formContainer">
                <h2>Sign Up</h2>
                <form className="signUpForm">
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
                    <button type="submit" className="formSubmit">Sign Up</button>
                </form>
                <p className="signIn">Already have an account? <strong>Sign In</strong></p>
            </div>
        </div>
    )
}

export default SignUp