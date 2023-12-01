import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { AiOutlineClose  } from "react-icons/ai"
import { Link } from "react-router-dom";
import {
    updateDoc,
    doc,
    onSnapshot
} from "firebase/firestore"

const SavedMovies = () => {

    const [movies, setMovies] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${currentUser?.email}`), (doc) => {
            setMovies(doc.data()?.savedMovies);
        })
    },[currentUser?.email]);

    const movieRef = doc(db, 'users', `${currentUser?.email}`)

    const removeFromFav = async(movieId) => {
        try {
            const result = movies.filter((item) => item.id !== movieId)
            await updateDoc(movieRef, {
                savedMovies: result
            })
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <>
           {
                movies.map((movie, id) => (
                <div key={id} className='moviecard watchMovieCard'>
                    {/* Movie card contains movie poster (if exists) and movie title */}
                    <Link to={`/movie/${movie.id}`} style={{textDecoration:"none",color:"white"}}>
                    {movie?.poster ? <img className='moviecover' src={`${process.env.REACT_APP_BASE_IMAGE_URL}w300${movie?.poster}`} alt=""/> : <div className='movie-placeholder'>No image found</div>}
                    <h5 className='movietitle'>{movie?.title}</h5>
                    </Link>
                    <p onClick={() => removeFromFav(movie.id)} className="deleteFromList"><AiOutlineClose className="close"/></p>
                </div>
                ))
           }
        </>
    )
}

export default SavedMovies