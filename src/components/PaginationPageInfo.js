//Imports
import React, {useContext} from "react";
import { PageContext } from "../App";

const PaginationPageInfo = () => {

  const {currentPage, totalPagesNumber} = useContext(PageContext)

    return (
        <div className="pagination-page-info">
        {/* Passing current page and total pages numbers to paragraph*/}
        <p>
          {currentPage} of {totalPagesNumber}
        </p>
      </div>
    )
}

export default PaginationPageInfo