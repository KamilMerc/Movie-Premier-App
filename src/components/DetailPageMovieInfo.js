import React from "react";

const DetailPageMovieInfo = (props) => {

    const minutesToHours = () => {
        if(props.runtime) {
            const hours = Math.floor(props.runtime/60);
            const minutes = props.runtime % 60;
            return `Runtime: ${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
        } else {
            return "Runtime: None"
        }
    } 

    return (
        <>
            <div className="movie-info">
                <div className="poster-image">
                    {props.movie.poster_path ? <img className="poster" src={props.posterImage} alt="poster" /> : <div className="noposter">No image found</div>}
                </div>
                <div className="info">
                    <h1 className="title">{props.movie.title}</h1>

                    <h3 className="tagline">{props.movie.tagline ? props.movie.tagline : <h3 className="no-tagline">No tagline found</h3>}</h3>

                    <div className="releaseanddate">
                        <p className="release-date">Release date: {props.movie.release_date ? props.releaseDate : "None"}</p>
                        <p className="runtime">{minutesToHours()}</p>
                        <p className="averageVote">Average vote: {props.movie.vote_average ? props.voteAverage : "None"}</p>
                    </div>

                    <div className="genres">
                        {props.genres && props.genres.slice(0,5).map((genre,i) => (
                            <p className="genre" key={i}>{genre.name}</p>
                        ))}
                    </div>

                    <div className="crew director"><strong>Director: </strong>{props.director.length !== 0 ? props.director.map((d, i) => (
                        <p key={i}>
                            {d.name}
                            {props.director.length - 1 !== i && ", "}
                        </p>
                    )) : <p>No director/s found</p>
                    }</div>

                    <div className="crew writer"><strong>Writer: </strong>
                    {props.writer.length !== 0 ? props.writer.map((w, i) => (
                        <p key={i}>
                            {w.name}
                            {props.writer.length - 1 !== i && ", "}
                        </p>
                    )) : <p>No writer/s found</p>
                    }</div>

                    <h2 className="ovr">Overview</h2>
                    {props.movie.overview ? <p className="overview">{props.movie.overview}</p> : <p className="overview">No overview found</p>}
                    
                </div>
            </div>
        </>
    )
}

export default DetailPageMovieInfo