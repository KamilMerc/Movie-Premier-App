//Imports
import React from 'react';
import { Link } from 'react-router-dom'

const MovieCard = ({movie}) => {

    return (
        //Creating moviecard containers. Each ones contains one fetched movie passing from renderMovies function
    <Link to={`/movie/${movie.id}`} style={{textDecoration:"none",color:"white"}}>
        <div className='moviecard'>
            {/* Movie card contains movie poster (if exists) and movie title */}
            {movie.poster_path ? <img className='moviecover' src={`${process.env.REACT_APP_BASE_IMAGE_URL}w300${movie.poster_path}`} alt=""/> : <div className='movie-placeholder'>No image found</div>}
            <h5 className='movietitle'>{movie.title}</h5>
        </div>
    </Link>
    );
};

//Export movie cards to be able to refer to them in Home.js file by calling renderMovies function in 'container' div
export default MovieCard 

