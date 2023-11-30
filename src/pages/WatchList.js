import React from "react";
import SavedMovies from "../components/SavedMovies";
import { Link } from "react-router-dom";

const WatchList = () => {

    return(
        <>
            <div className="watchListWrapper">
                <div className="wishListHeader">
                    <h1 className="title">Watch list</h1>
                    <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
                </div>
                <div className="container center watchList">
                    <SavedMovies/>
                </div>
            </div>
        </>
    )
}

export default WatchList