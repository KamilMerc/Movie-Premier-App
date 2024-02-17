import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    getAdditionalUserInfo,
} from "firebase/auth"

import {
    setDoc,
    doc
} from "firebase/firestore"

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true) //make sure that we don't render any of our application until current user being set for the very first time

    //Create user
    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            savedMovies: []
        })
    }

    const googlesignin = async () => {
        const googleAuthProvider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            const additionalUserInfo = getAdditionalUserInfo(result);

            if (additionalUserInfo.isNewUser) {
                await setDoc(doc(db, 'users', user.email), {
                    savedMovies: []
                });
            }
        } catch (error) {
            console.log("Błąd podczas logowania za pomocą konta Google:", error.message);
        }
    };

   
    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetpassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const emailUpdate = (email) => {
        return updateEmail(currentUser, email)
    }

    const passwordUpdate = (password) => {
        return updatePassword(currentUser, password)
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
        logout,
        resetpassword,
        emailUpdate,
        passwordUpdate
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}