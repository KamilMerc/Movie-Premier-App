//Imports
import React from "react";
import { useEffect, useContext } from "react";
import { PageContext } from "../App";

const PaginationRec = () => {

    //Pagination buttons
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  const btnReset = document.querySelector('.first-page')
  
  const {currentPageRec, nextPage, prevPage, lastUrl, totalPagesNumber, setCurrentPageRec, setNextPage, setPrevPage, fetchMovies} = useContext(PageContext)

  //Add or remove 'disabled' class to pagination buttons
  const disableBtns = () => {
    if(btnNext && btnPrev) {
      if(currentPageRec <= 1) {
        btnPrev.classList.add('disabled');
        btnNext.classList.remove('disabled');
      }
      else if(currentPageRec >= totalPagesNumber) {
        btnPrev.classList.remove('disabled');
        btnNext.classList.add('disabled');
      }
      else {
        btnPrev.classList.remove('disabled');
        btnNext.classList.remove('disabled');
      }
    }
  }

  const disableResetBtn = () => {
    if(btnReset) {
      if(currentPageRec === 1) {
        btnReset.classList.add('disabled');
      }
      else{
        btnReset.classList.remove('disabled');
      }
    }
  }

  //Calling disableBtns function
  useEffect(() => {
    disableBtns();
    disableResetBtn();
  }) 

  
  //Pagination to the next page
  const goToNextPage = () => {
    if (nextPage <= totalPagesNumber) {
      let nextPageTmp = nextPage + 1;
      let currnetPageTmp = currentPageRec + 1;
      let prevPageTmp = prevPage + 1;
      setCurrentPageRec(currnetPageTmp);
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
      let currnetPageTmp = currentPageRec - 1;
      let prevPageTmp = prevPage - 1;
      setCurrentPageRec(currnetPageTmp);
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

  const resetToFirstPage = () => {
    if(currentPageRec !== 1) {
      pageSelection(1)
      setCurrentPageRec(1)
      setNextPage(2)
      setPrevPage(0)
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

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

        <div className="reset">
          <button className="first-page" onClick={resetToFirstPage}>1</button>
        </div>
    </div>
  )
}

export default PaginationRec