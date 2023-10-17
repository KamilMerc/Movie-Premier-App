//Imports
import React from 'react';

const MovieCard = ({movie}) => {
    //Getting image path from API
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w300"
    
    return (
        //Creating moviecard containers. Each ones contains one fetched movie passing from renderMovies function
        <div className='moviecard'>
            {/* Movie card contains movie poster (if exists) and movie title */}
            {movie.poster_path ? <img className='moviecover' src={`${IMAGE_PATH}${movie.poster_path}`} alt=""/> : <div className='movie-placeholder'>No image found</div>}
            <h5 className='movietitle'>{movie.title}</h5>
        </div>
    );
};

//Export movie cards to be able to refer to them in App.js file by calling renderMovies function in 'container' div
export default MovieCard 

