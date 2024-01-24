import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
    doc,
    getDoc
} from "firebase/firestore"
import MovieCard from "../components/MovieCard";
import PaginationPageInfoRec from "../components/PaginationPageInfoRec";
import PaginationRec from "../components/PaginationRec";
import { PageContext } from "../App";
import { Link } from "react-router-dom";


const Recommended = () => {

  const {currentPageRec, setCurrentPageRec} = useContext(PageContext)
  const [moviesFromBase, setMoviesFromBase] = useState([])
  const { currentUser } = useAuth()
  const [movies, setMovies] = useState([]);
  const [prevPage, setPrevPage] = useState(currentPageRec-1);
  const [nextPage, setNextPage] = useState(currentPageRec+1);
  const [totalPagesNumber, setTotalPagesNumber] = useState([]);
  const [lastUrl, setLastUrl] = useState("");

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const range = 1;


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


let genresTmp = []
let genresString = ""
let genres = []

const getGenresString = () => {
  
  moviesFromBase.map(movie => (
      genresTmp.push(movie.genres)
  ))

  let genresOneDimentionalArray = [].concat.apply([],genresTmp)

  genresOneDimentionalArray.forEach(genre => {
      if(!genres.includes(genre)) {
          genres.push(genre)
      }
  });
 
  genresString = `${genres.join("|")}`
  return genresString
} 

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

  const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_KEY}&primary_release_date.gte=${queryParamBack()}&primary_release_date.lte=${queryParamForward()}&with_genres=${getGenresString()}&page=${currentPageRec}`;

  useEffect(() => {
    if (moviesFromBase.length > 0) {
        fetchMovies(URL);
    }
}, [moviesFromBase]);

  
  async function fetchMovies(url) {
 
    setLastUrl(url);
    await fetch(url) 
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length !== 0) {
          setMovies(data.results);
          setCurrentPageRec(data.page)
          setTotalPagesNumber(data.total_pages);
        }
      })
      .catch((err) => console.log(err));
  }; 



  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>);
  }

    return (
        <>
             {genres.length === 0 ? 
                <>
                    <div className="rec-empty">
                        <div className="empty">No recommendation yet. Add something to watchlist first</div>
                        <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
                    </div>
                </>
                 : 
                <>
                    <PageContext.Provider value={{movies, setMovies, currentPageRec, setCurrentPageRec, prevPage, setPrevPage, nextPage, setNextPage, totalPagesNumber, setTotalPagesNumber, lastUrl, setLastUrl, fetchMovies}}>

                        <div className="recomendation-header">
                          <h2>Your recommendations</h2>
                          <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
                          {/* <Link to={"/recommended"} style={{textDecoration:"none",color:"white"}}>
                          <p className="homePage">Recommended Movies</p>
                          </Link> */}
                        </div>

                        <div className="container center">{renderMovies()}</div>

                        <PaginationPageInfoRec/>

                        <PaginationRec/> 
                    </PageContext.Provider>
                </>
              }
        </>
    )
}

export default Recommended