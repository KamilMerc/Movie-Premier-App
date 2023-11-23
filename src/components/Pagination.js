//Imports
import React from "react";
import { useEffect, useContext } from "react";
import { PageContext } from "../App";

const Pagination = () => {

    //Pagination buttons
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  
  const {currentPage, nextPage, prevPage, lastUrl, totalPagesNumber, setCurrentPage, setNextPage, setPrevPage, fetchMovies} = useContext(PageContext)

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
      console.log(currentPage,currnetPageTmp,nextPage,nextPageTmp)
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
      console.log(currentPage,currnetPageTmp,nextPage,nextPageTmp)
    }
  };


  //Adding 'page' attribute and value from goToPrevPage or goToNextPage function to the url variable that goes to fetchMovies function
  const pageSelection = (page) => {
    let splitUrl = lastUrl.split("?");
    let queryParameter = splitUrl[1].split("&");
    let key = queryParameter[queryParameter.length - 1].split("=");
    if (key[0] !== "page") {
      let url = lastUrl + `&page=${page}`;
      console.log(url)
      fetchMovies(url);
    } else {
      key[1] = page.toString();
      let a = key.join("=");
      queryParameter[queryParameter.length - 1] = a;
      let b = queryParameter.join("&");
      let url = splitUrl[0] + "?" + b;
      console.log(url)
      fetchMovies(url);
    }
  };

  return (
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
  )
}

export default Pagination