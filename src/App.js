//Imports
import "./scss/App.scss";
import React, {createContext, useState} from "react";
import Home from "./pages/Home";
import Error from "./pages/Error";
import DetailPage from "./pages/DetailPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserDashboard from "./components/UserDashboard";
import WatchList from "./components/WatchList";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  ScrollToTop  from "./components/ScrollToTop" 
import { AuthProvider } from "./contexts/AuthContext";


 //Context Api
 export const PageContext = createContext()

function App() {
  const [currentPage, setCurrentPage] = useState();

  console.log(currentPage)
  return (
    <div className="App">
      <AuthProvider>
        <PageContext.Provider value={{currentPage, setCurrentPage}}>
          <Router>
              <ScrollToTop>
                <Routes>
                  <Route index element={<Home/>}></Route>
                  <Route path="movie/:id" element={<DetailPage/>}></Route>
                  <Route path="/*" element={<Error/>}></Route>
                  <Route path="/signup" element={<SignUp/>}></Route>
                  <Route path="/signin" element={<SignIn/>}></Route>
                  <Route path="/userdashboard" 
                    element={ 
                    <ProtectedRoute>
                      <UserDashboard/>
                    </ProtectedRoute>}>
                  </Route>
                  <Route path="/forgetpassword" element={<ForgotPassword/>}></Route>
                  <Route path="/updateprofile" 
                    element={ 
                    <ProtectedRoute>
                      <UpdateProfile/>
                    </ProtectedRoute>}>
                  </Route>
                  <Route path="/watchlist" 
                    element={ 
                    <ProtectedRoute>
                      <WatchList/>
                    </ProtectedRoute>}>
                  </Route>
                </Routes>
              </ScrollToTop>
            </Router>
        </PageContext.Provider>
      </AuthProvider>
    </div>
  );
}

//Export App.js to be able to render all application in root.render method in index.js file
export default App;
