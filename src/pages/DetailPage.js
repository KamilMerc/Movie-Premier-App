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

    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

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
            })
    }

    useEffect(() => {
        getMovie()
    },[])
    
    const minutesToHours = () => {
        const hours = Math.floor(runtime/60);
        const minutes = runtime % 60;
        return `Runtime: ${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
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
                        <p className="release-date">Release date: {movie.release_date ? releaseDate : "No release date found"}</p>
                        <p className="runtime">{minutesToHours()}</p>
                    </div>

                    <div className="genres">
                        {genres && genres.slice(0,5).map((genre,i) => (
                            <p className="genre" key={i}>{genre.name}</p>
                        ))}
                    </div>

                    <h2 className="ovr">Overview</h2>
                    {movie.overview ? <p className="overview">{movie.overview}</p> : <p className="no-overview">No overview found</p>}
                </div>
            </div>
        </div>
    )
}

export default DetailPage