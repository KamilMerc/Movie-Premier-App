import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [backdrop, setBackdrop] = useState([])
    const [poster, setPoster] = useState([])
    const [genres, setGenres] = useState([])
    const [releaseDate, setReleaseDate] = useState([])
    const [runtime, setRuntime] = useState([])
    const [voteAverage, setVoteAverage] = useState([])
    const [director, setDirector] = useState([])
    const [writer, setWriter] = useState([])


    const basicUrl = `https://api.themoviedb.org/3/movie/${id}`
    const apiKey = `?api_key=${process.env.REACT_APP_API_KEY}`
    const URL = `${basicUrl}${apiKey}`;

    const creditsUrl = `${basicUrl}/credits${apiKey}`

    const photosUrl = 'https://image.tmdb.org/t/p/original/'
    const backdropImage = `${photosUrl}${backdrop}`
    const posterImage = `${photosUrl}${poster}`
    // /videos to get tarilers

    async function getMovie() {
        await fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMovie(data)
                setBackdrop(data.backdrop_path)
                setPoster(data.poster_path)
                setGenres(data.genres)
                setReleaseDate(data.release_date)
                setRuntime(data.runtime)
                setVoteAverage(Math.round(data.vote_average * 10)/10)
            })
    }

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
        getMovie()
        getCastAndCrew()
    },[])
    
    const minutesToHours = () => {
        if(runtime) {
            const hours = Math.floor(runtime/60);
            const minutes = runtime % 60;
            return `Runtime: ${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
        } else {
            return "Runtime: None"
        }
    } 

    return(
        <div className="detail-page-wrapper">
            <div className="backdrop" style={{backgroundImage:`url(${backdropImage})`}}></div>
            <div className="movie-info">
                <div className="poster-image">
                    {movie.poster_path ? <img className="poster" src={posterImage} alt="poster" /> : <div className="noposter">No image found</div>}
                </div>
                <div className="info">
                    <h1 className="title">{movie.title}</h1>

                    <h3 className="tagline">{movie.tagline ? movie.tagline : <h3 className="no-tagline">No tagline found</h3>}</h3>

                    <div className="releaseanddate">
                        <p className="release-date">Release date: {movie.release_date ? releaseDate : "None"}</p>
                        <p className="runtime">{minutesToHours()}</p>
                        <p className="averageVote">Average vote: {movie.vote_average ? voteAverage : "None"}</p>
                    </div>

                    <div className="genres">
                        {genres && genres.slice(0,5).map((genre,i) => (
                            <p className="genre" key={i}>{genre.name}</p>
                        ))}
                    </div>

                    <div className="crew director"><strong>Director: </strong>{director.length !== 0 ? director.map((d, i) => (
                        <p key={i}>
                            {d.name}
                            {director.length - 1 !== i && ", "}
                        </p>
                    )) : <p>No director/s found</p>
                    }</div>

                    <div className="crew writer"><strong>Writer: </strong>
                    {writer.length !== 0 ? writer.map((w, i) => (
                        <p key={i}>
                            {w.name}
                            {writer.length - 1 !== i && ", "}
                        </p>
                    )) : <p>No writer/s found</p>
                    }</div>

                    <h2 className="ovr">Overview</h2>
                    {movie.overview ? <p className="overview">{movie.overview}</p> : <p className="overview">No overview found</p>}
                    
                </div>
            </div>
        </div>
    )
}

export default DetailPage