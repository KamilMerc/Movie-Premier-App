//Imports
import React, {useContext} from "react";
import { PageContext } from "../App";

const PaginationPageInfo = (props) => {

  const {totalPagesNumber} = useContext(PageContext)

    return (
        <div className="pagination-page-info">
        {/* Passing current page and total pages numbers to paragraph*/}
        <p>
          {props.currentPage} of {totalPagesNumber}
        </p>
      </div>
    )
}

export default PaginationPageInfo