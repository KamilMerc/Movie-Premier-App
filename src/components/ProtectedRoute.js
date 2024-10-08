import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const { currentUser } = useAuth()

    if(!currentUser) {
        return <Navigate to={"/"}/>
    }

    return children
}

export default ProtectedRoute