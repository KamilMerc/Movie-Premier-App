import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const UserDashboard = () => {

    const [error, setError] = useState("")
    const { currentUser } = useAuth()

    const logout = () => {

    }

    return (
        <div className="containerdashboard">
            <div className="profile">
                <h2>Profile</h2>
                {error && <p className="error">{error}</p>}
                <p className="email"><strong>Email:</strong>{currentUser.email}</p>
                <p className="update">Update Profile</p>
            </div>
            <button onClick={logout}  className="logout">Log Out</button>
        </div>
    )
}

export default UserDashboard