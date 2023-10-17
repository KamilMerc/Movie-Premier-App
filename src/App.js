//Imports
import { useEffect, useState } from "react";
import "./scss/App.scss";
import MovieCard from "./components/MovieCard";

function App() {
  //API key and URL
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = `?api_key=${process.env.REACT_APP_API_KEY}`;
  const URL = `${API_URL}/movie/now_playing${API_KEY}`;

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


  //Add or remove 'disabled' class to pagination buttons
  const disableBtns = () => {
    if(btnNext && btnPrev) {
      if(currentPage <= 1) {
        btnPrev.classList.add('disabled');
        btnNext.classList.remove('disabled');
      }
      else if(currentPage >= totalPagesNumber) {
        btnPrev.classList.remove('disabled');
        btnNext.classList.add('disabled');
      }
      else {
        btnPrev.classList.remove('disabled');
        btnNext.classList.remove('disabled');
      }
    }
  }

  //Calling disableBtns function
  useEffect(() => {
    disableBtns();
  })


  //Pagination to the next page
  const goToNextPage = () => {
    if (nextPage <= totalPagesNumber) {
      let nextPageTmp = nextPage + 1;
      let currnetPageTmp = currentPage + 1;
      let prevPageTmp = prevPage + 1;
      setCurrentPage(currnetPageTmp);
      setPrevPage(prevPageTmp);
      setNextPage(nextPageTmp);
      pageSelection(nextPage);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
  };
  

  //Pagination to the previous page
  const goToPrevPage = () => {
    if (prevPage > 0) {
      let nextPageTmp = nextPage - 1;
      let currnetPageTmp = currentPage - 1;
      let prevPageTmp = prevPage - 1;
      setCurrentPage(currnetPageTmp);
      setPrevPage(prevPageTmp);
      setNextPage(nextPageTmp);
      pageSelection(prevPage);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };


  //Adding 'page' attribute and value from goToPrevPage or goToNextPage function to the url variable that goes to fetchMovies function
  const pageSelection = (page) => {
    let splitUrl = lastUrl.split("?");
    let queryParameter = splitUrl[1].split("&");
    let key = queryParameter[queryParameter.length - 1].split("=");
    if (key[0] !== "page") {
      let url = lastUrl + `&page=${page}`;

      fetchMovies(url);
    } else {
      key[1] = page.toString();
      let a = key.join("=");
      queryParameter[queryParameter.length - 1] = a;
      let b = queryParameter.join("&");
      let url = splitUrl[0] + "?" + b;
      fetchMovies(url);
    }
  };


  //Passing fetched movies to 'MovieCard' component
  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);


  //Get all moviecards
  const movieList = document.querySelectorAll(".moviecard");

  //Movies searching
  const handleOnInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    let found = "";
    movieList.forEach((movie) => {
      const movieTitle = movie.textContent.toLocaleLowerCase();

      if (movieTitle.includes(inputValue)) {
        found = true;
      }
      if (found) {
        movie.style.display = "";
        found = false;
      } else {
        movie.style.display = "none";
      }
    });
  };


  return (
    <div className="App">
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
                // Reset values of current, next and prev page to start from page 1 when you change genre
                setCurrentPage(1)
                setNextPage(2)
                setPrevPage(0)
                //Passing to fetchMovies function URL with 'with_genre' attribute that allows get movies only with particular genre
                fetchMovies(`${URL}&with_genres=${e.target.value}`)
                window.scrollTo({top: 0, behavior: 'smooth'});
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

          {/* Calling handleOnInput function on input that search movies by text that we type in input*/}
          <form onInput={handleOnInput}>
            <input type="text" placeholder="Search by movie title" />
          </form>
        </div>
      </header>


      {/* Calling renderMovies function that places movie cards from 'MovieCard' component into 'container' div*/}
      <div className="container center">{renderMovies()}</div>

      <div className="pagination-page-info">
        {/* Passing current page and total pages numbers to paragraph*/}
        <p>
          {currentPage} of {totalPagesNumber}
        </p>
      </div>

      <div className="pagination-btns">
        {/* Calling goToPrevPage function */}
        <button onClick={goToPrevPage} className="prev">
          prev
        </button>
        {/* Calling goToNextPage function */}
        <button onClick={goToNextPage} className="next">
          next
        </button>
      </div>
    </div>
  );
}

//Export App.js to be able to render all application in root.render method in index.js file
export default App;