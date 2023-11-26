import React from "react";
import { Link, useNavigate } from "react-router-dom"
import arrow from '../images/backarrow.png';
import defaultbg from '../images/default-wallpapers.jpg'

const DetailPageBackdrop = (props) => {
    const navigate = useNavigate()
    // const URL = `${props.url}&page=${props.currentPage}`


    const goPrevious = () => {
        // props.fetchMovies(URL)
        navigate(-1)
    }

    return (
        <>
            {props.backdrop ? <div className="backdrop" style={{backgroundImage:`url(${props.backdropImage})`}}></div> : <div className="backdrop" style={{backgroundImage:`url(${defaultbg})`}}></div>}
           
            <img className="backarrow" src={arrow} alt="backarrow" onClick={
                goPrevious
            }/>

            <Link to={"/signup"} style={{textDecoration:"none",color:"white"}}>
                <p className="sign">Sign In</p>
            </Link>
        </>
    )
}

export default DetailPageBackdrop