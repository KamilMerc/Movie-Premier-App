import React,  { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile = () => {

    //useRef allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated
    const emailRef = useRef()
    const passwordRef  = useRef()
    const passwordConfirmRef = useRef()

    const { currentUser, emailUpdate, passwordUpdate } = useAuth()

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false) //it is used to prevent multiple click sign up button when user is creating (preventing error occured)


    const submitForm = (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match")
        }

        const promises = []

        setLoading(true)
        setError("")

        if(emailRef.current.value !== currentUser.email) {
            promises.push(emailUpdate(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(passwordUpdate(passwordRef.current.value))
        }

        //when all promises finished then navigate to home page. If something wrong catch error and finally setLoading to false
        Promise.all(promises).then(() => {
            navigate("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    }

    return(
        <div className="containermain">
            
            <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
            
            <div className="formContainer">
                <h2>Update Profile</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={submitForm} className="signUpForm">
                    <div id="email" className="formGroup">
                        <label className="signUpLabel" htmlFor="email">Email</label>
                        <input className="signUpInput" name="email" type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                    </div>
                    <div id="password" className="formGroup">
                        <label className="signUpLabel" htmlFor="password">Password</label>
                        <input placeholder="Leave empty to keep the same" className="signUpInput" name="password" type="password" ref={passwordRef}/>
                    </div>
                    <div id="passwordConfirm" className="formGroup">
                        <label className="signUpLabel" htmlFor="passwordConfirm">Password Confirmation</label>
                        <input placeholder="Leave empty to keep the same" className="signUpInput" name="passwordConfirm" type="password" ref={passwordConfirmRef}/>
                    </div>
                    <button disabled={loading} type="submit" className="formSubmit updatebtn">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile