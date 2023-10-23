import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    // /videos to get tarilers

    async function getMovie() {
        await fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMovie(data)
            })
    }

    useEffect(() => {
        getMovie()
    },[])

    return(
        <h1>{movie.title}</h1>
    )
}

export default DetailPage