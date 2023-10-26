import React from "react";

const DetailPageCast = ({actor}) => {
    return (
        <div className="actorCard">
            {actor.profile_path ? <img className="actorPhoto" src={`${process.env.REACT_APP_BASE_IMAGE_URL}w185${actor.profile_path}`} alt=""/> : <div className="actorPhoto">No image found</div>}
            {actor.name ? <h5 className="name">{actor.name}</h5> : <h5 className="name">No name found</h5>}
            {actor.character ? <p className="character">{actor.character}</p> : <p className="character">No character found</p>}
        </div>
    )
}

export default DetailPageCast