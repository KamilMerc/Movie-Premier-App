import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import DetailPageMovieInfo from "../components/DetailPageMovieInfo";

function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [backdrop, setBackdrop] = useState([])
    const [poster, setPoster] = useState([])
    const [genres, setGenres] = useState([])
    const [releaseDate, setReleaseDate] = useState([])
    const [runtime, setRuntime] = useState([])
    const [voteAverage, setVoteAverage] = useState([])

    const URL = `${process.env.REACT_APP_BASE_URL}${id}${process.env.REACT_APP_API_KEY}`;

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
    
    useEffect(() => {
        getMovie()
    },[])

    return(
        <div className="detail-page-wrapper">
            <div className="backdrop" style={{backgroundImage:`url(${backdropImage})`}}></div>

            <DetailPageMovieInfo
                movie={movie}
                genres={genres}
                releaseDate={releaseDate}
                runtime={runtime}
                voteAverage={voteAverage}
                posterImage={posterImage}
                id={id}
            />
        </div>
    )
}

export default DetailPage