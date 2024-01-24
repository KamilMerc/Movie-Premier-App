//Imports
import React, {useContext} from "react";
import { PageContext } from "../App";

const PaginationPageInfoRec = () => {

  const {currentPageRec, totalPagesNumber} = useContext(PageContext)

    return (
        <div className="pagination-page-info">
        {/* Passing current page and total pages numbers to paragraph*/}
        <p>
          {currentPageRec} of {totalPagesNumber}
        </p>
      </div>
    )
}

export default PaginationPageInfoRec