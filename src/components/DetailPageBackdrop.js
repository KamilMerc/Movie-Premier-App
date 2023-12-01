import React from "react";
import { Link, useNavigate } from "react-router-dom"
import arrow from '../images/backarrow.png';
import defaultbg from '../images/default-wallpapers.jpg'
import { useAuth } from "../contexts/AuthContext";

const DetailPageBackdrop = (props) => {
    const navigate = useNavigate()

    const { currentUser } = useAuth()

    const goPrevious = () => {
        navigate(-1)
    }

    return (
        <>
            {props.backdrop ? <div className="backdrop" style={{backgroundImage:`url(${props.backdropImage})`}}></div> : <div className="backdrop" style={{backgroundImage:`url(${defaultbg})`}}></div>}
           
            <img className="backarrow" src={arrow} alt="backarrow" onClick={
                goPrevious
            }/>

            {currentUser ? <Link to={"/userdashboard"} style={{textDecoration:"none",color:"white"}}><p className="sign">Hello Welcome</p></Link> : <Link to={"/signin"} style={{textDecoration:"none",color:"white"}}>
              <p className="sign">Sign In</p>
            </Link>}
        </>
    )
}

export default DetailPageBackdrop