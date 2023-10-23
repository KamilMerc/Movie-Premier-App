import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [backdrop, setBackdrop] = useState([])

    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const backdropImage = `https://image.tmdb.org/t/p/original/${backdrop}`
    // /videos to get tarilers

    async function getMovie() {
        await fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMovie(data)
                setBackdrop(data.backdrop_path)
            })
    }

    useEffect(() => {
        getMovie()
    },[])

    return(
        <div>
            <div className="banner" style={{backgroundImage:`url(${backdropImage})`}}></div>
        </div>
    )
}

export default DetailPage