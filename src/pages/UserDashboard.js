import React, { useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext";
import { PageContext } from "../App";

const UserDashboard = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const {setCurrentPageRec, setCurrentPage, setGenre, setFilter} = useContext(PageContext)

    const navigate = useNavigate()

    const userLogout = async() => {
        setError("")
            await logout()
            setCurrentPageRec(1)
            setCurrentPage(1)
            setGenre("")
            setFilter("")
            navigate("/")
        try {

        }
        catch {
          setError("Failed to log out")  
        }
    }

    return (
        <div className="containerdashboard">
            <Link to={"/"} style={{textDecoration:"none",color:"white"}}><p className="homePage">Back to home page</p></Link>
            
            <div className="profile">
                <h2>Profile</h2>
                {error && <p className="error">{error}</p>}
                <p className="email"><strong>Email:</strong>{currentUser.email}</p>
                {currentUser.email.includes("@gmail.com") ? null : <Link to={"/updateprofile"} style={{textDecoration:"none",color:"white"}}><p className="update">Update Profile</p></Link>}
                {<Link to={"/watchlist"} style={{textDecoration:"none",color:"white"}}><p className="update">Watch list</p></Link>}
            </div>
            <button onClick={userLogout}  className="logout">Log Out</button>
        </div>
    )
}

export default UserDashboard