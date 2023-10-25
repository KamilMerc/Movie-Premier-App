import React from "react";

const DetailPageBackdrop = (props) => {
    return (
        <>
            <div className="backdrop" style={{backgroundImage:`url(${props.backdropImage})`}}></div>
        </>
    )
}

export default DetailPageBackdrop