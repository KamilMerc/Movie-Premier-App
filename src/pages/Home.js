import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import PaginationPageInfo from "../components/PaginationPageInfo";

function Home() {

  //Time range variables
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const range = 1;

// Max range date
  const queryParamBack = () => {
    if(month-range < 10 && month-range >= 1) {
      return `${year}-0${month-range}-01`
    }
    else if(month-range < 1) {
      return `${year-1}-12-01`
    }
    else if(month-range >= 10) {
      return `${year}-${month-range}-01`
    }
  }

  // Min range date
  const queryParamForward = () => {
    if(month+range < 10) {
      return `${year}-0${month+range}-01`
    }
    else if(month+range > 12) {
      return `${year+1}-01-01`
    }
    else if(month+range >= 10 && month+range <= 12) {
      return `${year}-${month+range}-01`
    }
  }

  //API URL
  const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_KEY}&primary_release_date.gte=${queryParamBack()}&primary_release_date.lte=${queryParamForward()}`;

  //Pagination buttons
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');

  //States
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(currentPage-1);
  const [nextPage, setNextPage] = useState(currentPage+1);
  const [totalPagesNumber, setTotalPagesNumber] = useState([]);
  const [lastUrl, setLastUrl] = useState("");

  
  //Fetch data from API
  async function fetchMovies(url) {

    setLastUrl(url);
    
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length !== 0) {
          setMovies(data.results);
          setLastUrl(url);
          setTotalPagesNumber(data.total_pages);
        }
      })
      .catch((err) => console.log(err));
  };

  //Calling fetchMovies function
  useEffect(() => {
    fetchMovies(URL);
  },[]);


  //Passing fetched movies to 'MovieCard' component
  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  }

  return (
    <div className="App">
      <Header
        URL={URL}
        setCurrentPage={setCurrentPage}
        setNextPage={setNextPage}
        setPrevPage={setPrevPage}
        fetchMovies={fetchMovies}
      />

      {/* Calling renderMovies function that places movie cards from 'MovieCard' component into 'container' div*/}
      <div className="container center">{renderMovies()}</div>

      <PaginationPageInfo
        currentPage={currentPage}
        totalPagesNumber={totalPagesNumber}
      />

      <Pagination 
        btnNext={btnNext}
        btnPrev={btnPrev}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        lastUrl={lastUrl}
        totalPagesNumber={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        setNextPage={setNextPage}
        setPrevPage={setPrevPage}
        fetchMovies={fetchMovies}
      />
    </div>
  );
}

export default Home;