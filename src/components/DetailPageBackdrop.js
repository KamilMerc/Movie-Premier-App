import React from "react";
import { useNavigate } from "react-router-dom"
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

            <p className="sign">Sign In</p>
        </>
    )
}

export default DetailPageBackdrop