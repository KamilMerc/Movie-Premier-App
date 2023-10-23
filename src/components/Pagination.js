//Imports
import React from "react";
import { useEffect } from "react";

const Pagination = (props) => {
  
  //Add or remove 'disabled' class to pagination buttons
  const disableBtns = () => {
    if(props.btnNext && props.btnPrev) {
      if(props.currentPage <= 1) {
        props.btnPrev.classList.add('disabled');
        props.btnNext.classList.remove('disabled');
      }
      else if(props.currentPage >= props.totalPagesNumber) {
        props.btnPrev.classList.remove('disabled');
        props.btnNext.classList.add('disabled');
      }
      else {
        props.btnPrev.classList.remove('disabled');
        props.btnNext.classList.remove('disabled');
      }
    }
  }

  //Calling disableBtns function
  useEffect(() => {
    disableBtns();
  }) 


  //Pagination to the next page
  const goToNextPage = () => {
    if (props.nextPage <= props.totalPagesNumber) {
      let nextPageTmp = props.nextPage + 1;
      let currnetPageTmp = props.currentPage + 1;
      let prevPageTmp = props.prevPage + 1;
      props.setCurrentPage(currnetPageTmp);
      props.setPrevPage(prevPageTmp);
      props.setNextPage(nextPageTmp);
      pageSelection(props.nextPage);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
  };
  

  //Pagination to the previous page
  const goToPrevPage = () => {
    if (props.prevPage > 0) {
      let nextPageTmp = props.nextPage - 1;
      let currnetPageTmp = props.currentPage - 1;
      let prevPageTmp = props.prevPage - 1;
      props.setCurrentPage(currnetPageTmp);
      props.setPrevPage(prevPageTmp);
      props.setNextPage(nextPageTmp);
      pageSelection(props.prevPage);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };


  //Adding 'page' attribute and value from goToPrevPage or goToNextPage function to the url variable that goes to fetchMovies function
  const pageSelection = (page) => {
    let splitUrl = props.lastUrl.split("?");
    let queryParameter = splitUrl[1].split("&");
    let key = queryParameter[queryParameter.length - 1].split("=");
    if (key[0] !== "page") {
      let url = props.lastUrl + `&page=${page}`;

      props.fetchMovies(url);
    } else {
      key[1] = page.toString();
      let a = key.join("=");
      queryParameter[queryParameter.length - 1] = a;
      let b = queryParameter.join("&");
      let url = splitUrl[0] + "?" + b;
      props.fetchMovies(url);
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