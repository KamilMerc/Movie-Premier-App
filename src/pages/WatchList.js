import React from "react";
import SavedMovies from "../components/SavedMovies";

const WatchList = () => {

    return(
        <>
            <div className="watchListWrapper">
                <h1 className="title">Watch list</h1>
                <div className="container center watchList">
                    <SavedMovies/>
                </div>
            </div>
        </>
    )
}

export default WatchList