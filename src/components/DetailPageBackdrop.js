import React from "react";
import arrow from '../images/backarrow.png'

const DetailPageBackdrop = (props) => {
    return (
        <>
            <div className="backdrop" style={{backgroundImage:`url(${props.backdropImage})`}}></div>
            <img className="backarrow" src={arrow} alt="backarrow" />
        </>
    )
}

export default DetailPageBackdrop