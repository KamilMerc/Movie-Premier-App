import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import DetailPageMovieInfo from "../components/DetailPageMovieInfo";
import DetailPageBackdrop from "../components/DetailPageBackdrop";

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

    const backdropImage = `${process.env.REACT_APP_BASE_IMAGE_URL}original/${backdrop}`
    const posterImage = `${process.env.REACT_APP_BASE_IMAGE_URL}original/${poster}`
    // /videos to get tarilers

    async function getMovie() {
        await fetch(URL)
            .then((res) => res.json())
            .then((data) => {
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
            <DetailPageBackdrop
                backdropImage={backdropImage}
            />

            {/* Call DetailPageMovieInfo component and pass props to it */}
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