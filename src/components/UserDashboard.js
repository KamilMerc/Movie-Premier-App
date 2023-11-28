import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext";

const UserDashboard = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()

    const navigate = useNavigate()

    const userLogout = async() => {
        setError("")
            await logout()
            navigate("/")
        try {

        }
        catch {
          setError("Failed to log out")  
        }
    }

    return (
        <div className="containerdashboard">
            <div className="profile">
                <h2>Profile</h2>
                {error && <p className="error">{error}</p>}
                <p className="email"><strong>Email:</strong>{currentUser.email}</p>
                {currentUser.email.includes("@gmail.com") ? null : <Link to={"/updateprofile"} style={{textDecoration:"none",color:"white"}}><p className="update">Update Profile</p></Link>}
            </div>
            <button onClick={userLogout}  className="logout">Log Out</button>
        </div>
    )
}

export default UserDashboard