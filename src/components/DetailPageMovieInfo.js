import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase"
import {
    arrayUnion,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore"

const DetailPageMovieInfo = (props) => {
    console.log(props)
    const [favorite, setFavorite] = useState(false)
    const [moviesFromBase, setMoviesFromBase] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const documentSnapshot = doc(db, 'users', `${currentUser?.email}`);
            const data = (await getDoc(documentSnapshot)).data();
            setMoviesFromBase(data?.savedMovies);
          }catch(e) {
            console.error(e)
          }
        }
        fetchData()
      },[currentUser?.email])


    useEffect(() => {
        moviesFromBase && moviesFromBase.forEach(movie => {
            if(movie.title === props.movie.title) setFavorite(true)
        })
    },[moviesFromBase, props.movie.title])


    const movieRef = doc(db, 'users', `${currentUser?.email}`)

    const deleteFromWatchList = async(movieId) => {
        try {
            const result = moviesFromBase.filter((item) => item.id !== movieId)
            await updateDoc(movieRef, {
                savedMovies: result
            })
        } catch(error) {
            console.log(error)
        }
        setFavorite(!favorite)
    }


    let genres = []

    props.genres.slice(0,5).map(genre => (
        genres.push(genre.id)
    ))

    //referencing the database of users that grabing specyfic user email
    const movieId = doc(db, 'users', `${currentUser?.email}`)

    //arrayUnion - update document in firebase
    const saveMovie = async () => {
        if(currentUser?.email) {
            setFavorite(!favorite)
            await updateDoc(movieId, {
               savedMovies: arrayUnion({
                id: props.movie.id,
                title: props.movie.title,
                poster: props.movie.poster_path,
                genres: genres
               })
            })
        } else {
            alert("Sign In to save movie")
        }
    }

    //Change minutes to hours 
    const minutesToHours = () => {
        if(props.runtime) {
            if(props.runtime >= 60) {
                const hours = Math.floor(props.runtime/60);
                const minutes = props.runtime % 60;
                return `Runtime: ${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
            } else {
                return `Runtime: ${props.runtime}m`
            }
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

                    <div className="addtofav">
                        {favorite ? <FaHeart className="heart" onClick={() => deleteFromWatchList(props.movie.id)} /> : <FaRegHeart className="heart" onClick={saveMovie}/>}
                    </div>

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
                        {getDirectorOrWriterName(props.director, "No director/s found")}
                    </div>

                    {/* Calling getDirectorOrWriterName function on writer*/}
                    <div className="crew writer"><strong>Writer: </strong>
                        {getDirectorOrWriterName(props.writer, "No writer/s found")}
                    </div>

                    <h2 className="ovr">Overview</h2>
                    {props.movie.overview ? <p className="overview">{props.movie.overview}</p> : <p className="overview">No overview found</p>}
        
                    {props.DetailPageProviders}
                    
                </div>
            </div>
        </>
    )
}

export default DetailPageMovieInfo