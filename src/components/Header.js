//Imports
import React, { useEffect, useState, useContext } from "react";
import { PageContext } from "../App";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = (props) => {

const {setCurrentPage, setNextPage, setPrevPage, fetchMovies} = useContext(PageContext)

const [genre, setGenre] = useState("")
const [filter, setFilter] = useState("")

const { currentUser } = useAuth()

  //Fetch movies by selected genre
  const fetchWithFilters = () => {
    // Reset values of current, next and prev page to start from page 1 when you change genre
    setCurrentPage(1)
    setNextPage(2)
    setPrevPage(0)
    //Passing to fetchMovies function URL with 'with_genre' attribute that allows get movies only with particular genre
    fetchMovies(`${props.URL}${genre}${filter}
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
            {currentUser ? <p>Hello Welcome</p> : <Link to={"/signin"} style={{textDecoration:"none",color:"white"}}>
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
                <option value="">All genres</option>
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
                <option value="popularity.desc">Popularity DESC</option>
                <option value="popularity.asc">Popularity ASC</option>
                <option value="vote_average.desc">Vote average DESC</option>
                <option value="vote_average.asc">Vote average ASC</option>
                <option value="primary_release_date.desc">Release date DESC</option>
                <option value="primary_release_date.asc">Release date ASC</option>
              </select>
              </div>
          </form>
        </div>
      </header>
    )
}

export default Header