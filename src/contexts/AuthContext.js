import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true) //make sure that we don't render any of our application until current user being set for the very first time

    //Create user
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googlesignin = () => {
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }

    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    //setCurrentUser
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])

    const value = {
        currentUser,
        signin,
        signup,
        googlesignin,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}