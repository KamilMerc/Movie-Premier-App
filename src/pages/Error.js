import React from "react"
import { Link } from "react-router-dom"

function Error() {
    return(
        <>
            <h1>Thre is no such page</h1>
            <Link to="/"><button className="backtohome">Back to Home page</button></Link>
        </>
    )
}

export default Error