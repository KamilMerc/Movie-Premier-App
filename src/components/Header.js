//Imports
import React, { useEffect, useContext } from "react";
import { PageContext } from "../App";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {

const {setCurrentPage, setNextPage, setPrevPage, fetchMovies, queryParamBack, queryParamForward, genre, setGenre, filter, setFilter} = useContext(PageContext)

const { currentUser } = useAuth()

  //Fetch movies by selected genre
  const fetchWithFilters = () => {
    // Reset values of current, next and prev page to start from page 1 when you change genre
    setCurrentPage(1)
    setNextPage(2)
    setPrevPage(0)
    //Passing to fetchMovies function URL with 'with_genre' attribute that allows get movies only with particular genre
    fetchMovies(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_KEY}&primary_release_date.gte=${queryParamBack()}&primary_release_date.lte=${queryParamForward()}${genre}${filter}
    `)
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  useEffect(() => {
      fetchWithFilters()
  },[genre,filter])

    return (
        <header>
        <div className="header-wrapper center">
          <div className="signWrapper">
            <h1>Movie Premier App</h1>
            {currentUser ? <Link to={"/userdashboard"} style={{textDecoration:"none",color:"white"}}><p>Hello Welcome</p></Link> : <Link to={"/signin"} style={{textDecoration:"none",color:"white"}}>
              <p>Sign In</p>
            </Link>}
          </div>
          <form>
            {/* Genre selection */}
            <div className="filters-container">
              <label htmlFor="genres">Genre:</label>
              <select 
                id="genres"
                name="genres"
                onChange={(e) => {
                  setGenre(`&with_genres=${e.target.value}`)
                }}
              >
                {/* Genre options */}
                <option selected={genre === "&with_genres="} value="">All genres</option>
                <option selected={genre === "&with_genres=28"} value="28">Action</option>
                <option selected={genre === "&with_genres=12"} value="12">Adventure</option>
                <option selected={genre === "&with_genres=16"} value="16">Animation</option>
                <option selected={genre === "&with_genres=35"} value="35">Comedy</option>
                <option selected={genre === "&with_genres=80"} value="80">Crime</option>
                <option selected={genre === "&with_genres=99"} value="99">Documentary</option>
                <option selected={genre === "&with_genres=18"} value="18">Drama</option>
                <option selected={genre === "&with_genres=10751"} value="10751">Family</option>
                <option selected={genre === "&with_genres=14"} value="14">Fantasy</option>
                <option selected={genre === "&with_genres=36"} value="36">History</option>
                <option selected={genre === "&with_genres=27"} value="27">Horror</option>
                <option selected={genre === "&with_genres=10402"} value="10402">Music</option>
                <option selected={genre === "&with_genres=9648"} value="9648">Mystery</option>
                <option selected={genre === "&with_genres=10749"} value="10749">Romance</option>
                <option selected={genre === "&with_genres=878"} value="878">Science Fiction</option>
                <option selected={genre === "&with_genres=10770"} value="10770">TV Movie</option>
                <option selected={genre === "&with_genres=53"} value="53">Thriller</option>
                <option selected={genre === "&with_genres=10752"} value="10752">War</option>
                <option selected={genre === "&with_genres=37"} value="37">Western</option>
              </select>
            </div>
            
            <div className="filters-container">
              <label htmlFor="sortby">Sort by:</label>
              <select 
                id="sortby"
                name="sortby"
                onChange={(e) => {
                  setFilter(`&sort_by=${e.target.value}`)
                }}
              >
                {/* sortby options */}
                <option selected={filter === "&sort_by=popularity.desc"} value="popularity.desc">Popularity DESC</option>
                <option selected={filter === "&sort_by=popularity.asc"} value="popularity.asc">Popularity ASC</option>
                <option selected={filter === "&sort_by=vote_average.desc"} value="vote_average.desc">Vote average DESC</option>
                <option selected={filter === "&sort_by=vote_average.asc"} value="vote_average.asc">Vote average ASC</option>
                <option selected={filter === "&sort_by=primary_release_date.desc"} value="primary_release_date.desc">Release date DESC</option>
                <option selected={filter === "&sort_by=primary_release_date.asc"} value="primary_release_date.asc">Release date ASC</option>
              </select>
              </div>
          </form>
        </div>
      </header>
    )
}

export default Header