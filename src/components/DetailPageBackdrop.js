import React from "react";
import arrow from '../images/backarrow.png';
import defaultbg from '../images/default-wallpapers.jpg'

const DetailPageBackdrop = (props) => {
    return (
        <>
            {props.backdrop ? <div className="backdrop" style={{backgroundImage:`url(${props.backdropImage})`}}></div> : <div className="backdrop" style={{backgroundImage:`url(${defaultbg})`}}></div>}
            <img className="backarrow" src={arrow} alt="backarrow" />
        </>
    )
}

export default DetailPageBackdrop