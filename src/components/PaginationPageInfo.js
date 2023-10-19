//Imports
import React from "react";

const PaginationPageInfo = (props) => {
    return (
        <div className="pagination-page-info">
        {/* Passing current page and total pages numbers to paragraph*/}
        <p>
          {props.currentPage} of {props.totalPagesNumber}
        </p>
      </div>
    )
}

export default PaginationPageInfo