import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import DetailPageMovieInfo from "../components/DetailPageMovieInfo";
import DetailPageBackdrop from "../components/DetailPageBackdrop";
import DetailPageCast from "../components/DetailPageCast";
import DetailPageProviders from "../components/DetailPageProviders";
import DetailPageVideo from "../components/DetailPageVideo";

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
    const [actors, setActors] = useState([])

    const URL = `${process.env.REACT_APP_BASE_URL}${id}${process.env.REACT_APP_API_KEY}`;
    const creditsUrl = `${process.env.REACT_APP_BASE_URL}${id}/credits${process.env.REACT_APP_API_KEY}`

    const backdropImage = `${process.env.REACT_APP_BASE_IMAGE_URL}original/${backdrop}`
    const posterImage = `${process.env.REACT_APP_BASE_IMAGE_URL}original/${poster}`

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


    async function getCastAndCrew() {
        await fetch(creditsUrl)
            .then((res) => res.json())
            .then((data) => {
                setDirector(data.crew.filter((d) => d.job === "Director"))
                setWriter(data.crew.filter((d) => d.job === "Screenplay" ||  d.job === "Writer"))
                setActors(data.cast.slice(0,6))
            })
    }
    
    useEffect(() => {
        getMovie()
        getCastAndCrew()
    },[])

    
    const renderCast = () => {
        return actors.map((actor) => <DetailPageCast key={actor.id} actor={actor}/>)
    }
    

    return(
        <div className="detail-page-wrapper">
            <DetailPageBackdrop
                backdropImage={backdropImage}
                backdrop={backdrop}
            />

            {/* Call DetailPageMovieInfo component and pass props to it */}
            <DetailPageMovieInfo
                movie={movie}
                genres={genres}
                releaseDate={releaseDate}
                runtime={runtime}
                voteAverage={voteAverage}
                posterImage={posterImage}
                director={director}
                writer={writer}
                id={id}
            />

            <DetailPageProviders
                id={id}
            />

            <div className="casts">
                {actors.length !== 0 ? <h4 className="cast">Lead Cast:</h4> : <h4 className="cast">Lead Cast: Not found</h4>}
                <div className="actors">
                    {renderCast()}
                </div>
            </div>

            <DetailPageVideo
                id={id}
            />
        </div>
    )
}

export default DetailPage