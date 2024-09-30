//Imports
import React from "react";
import { useEffect, useContext } from "react";
import { PageContext } from "../App";

const Pagination = (props) => {

    //Pagination buttons
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  const btnReset = document.querySelector('.first-page')
  
  const {nextPage, prevPage, lastUrl, totalPagesNumber, setNextPage, setPrevPage, fetchMovies} = useContext(PageContext)

  //Add or remove 'disabled' class to pagination buttons
  const disableBtns = () => {
    if(btnNext && btnPrev) {
      if(props.currentPage <= 1) {
        btnPrev.classList.add('disabled');
        btnNext.classList.remove('disabled');
      }
      else if(props.currentPage >= totalPagesNumber) {
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
      if(props.currentPage === 1) {
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
      props.setCurrentPage(props.currentPage + 1);
      setPrevPage(prevPage + 1);
      setNextPage(nextPage + 1);
      pageSelection(nextPage);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
  };
  

  //Pagination to the previous page
  const goToPrevPage = () => {
    if (prevPage > 0) {
      props.setCurrentPage(props.currentPage - 1);
      setPrevPage(prevPage - 1);
      setNextPage(nextPage - 1);
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
    if(props.currentPage !== 1) {
      pageSelection(1)
      props.setCurrentPage(1)
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

export default Pagination