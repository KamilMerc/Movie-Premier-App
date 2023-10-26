import React from "react";
import { useEffect, useState } from "react";

const DetailPageMovieInfo = (props) => {

    const [director, setDirector] = useState([])
    const [writer, setWriter] = useState([])

    const creditsUrl = `${process.env.REACT_APP_BASE_URL}${props.id}/credits${process.env.REACT_APP_API_KEY}`

    async function getCastAndCrew() {
        await fetch(creditsUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDirector(data.crew.filter((d) => d.job === "Director"))
                setWriter(data.crew.filter((d) => d.job === "Screenplay" ||  d.job === "Writer"))
            })
    }

    useEffect(() => {
        getCastAndCrew()
    },[])


    //Change minutes to hours 
    const minutesToHours = () => {
        if(props.runtime) {
            const hours = Math.floor(props.runtime/60);
            const minutes = props.runtime % 60;
            return `Runtime: ${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
        } else {
            return "Runtime: None"
        }
    }
    
    // map director or writer array to get name and add "," when there is next record
    const getDirectorOrWriterName = (job, msg) => {
       return job.length !== 0 ? job.map((d, i) => (
            <p key={i}>
                {d.name}
                {job.length - 1 !== i && ", "}
            </p>
        )) : <p>{msg}</p>
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

                    {/* Calling getDirectorOrWriterName function on director*/}
                    <div className="crew director"><strong>Director: </strong>
                        {getDirectorOrWriterName(director, "No director/s found")}
                    </div>

                    {/* Calling getDirectorOrWriterName function on writer*/}
                    <div className="crew writer"><strong>Writer: </strong>
                        {getDirectorOrWriterName(writer, "No writer/s found")}
                    </div>

                    <h2 className="ovr">Overview</h2>
                    {props.movie.overview ? <p className="overview">{props.movie.overview}</p> : <p className="overview">No overview found</p>}
                    
                </div>
            </div>
        </>
    )
}

export default DetailPageMovieInfo