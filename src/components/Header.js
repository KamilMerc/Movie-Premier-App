//Imports
import React from "react";

const Header = (props) => {

  //Fetch movies by selected genre
  const genreSelection = (genre) => {
    // Reset values of current, next and prev page to start from page 1 when you change genre
    props.setCurrentPage(1)
    props.setNextPage(2)
    props.setPrevPage(0)
    //Passing to fetchMovies function URL with 'with_genre' attribute that allows get movies only with particular genre
    props.fetchMovies(`${props.URL}&with_genres=${genre}`)
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  

    return (
        <header>
        <div className="header-wrapper center">
          <h1>Movie Premier App</h1>
          <form>
            {/* Genre selection */}
            <label htmlFor="genres">Genre:</label>
            <select 
              id="genres"
              name="genres"
              onChange={(e) => {
                genreSelection(e.target.value)
              }}
            >
              {/* Genre options */}
              <option value="">All</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="10770">TV Movie</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </select>
          </form>

        </div>
      </header>
    )
}

export default Header