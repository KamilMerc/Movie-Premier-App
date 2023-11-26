//Imports
import "./scss/App.scss";
import React, {createContext, useState} from "react";
import Home from "./pages/Home";
import Error from "./pages/Error";
import DetailPage from "./pages/DetailPage";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  ScrollToTop  from "./components/ScrollToTop" 


 //Context Api
 export const PageContext = createContext()

function App() {
  const [currentPage, setCurrentPage] = useState();

  console.log(currentPage)
  return (
    <div className="App">
      <PageContext.Provider value={{currentPage, setCurrentPage}}>
        <Router>
            <ScrollToTop>
              <Routes>
                <Route index element={<Home/>}></Route>
                <Route path="movie/:id" element={<DetailPage/>}></Route>
                <Route path="/*" element={<Error/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
              </Routes>
            </ScrollToTop>
          </Router>
      </PageContext.Provider>
    </div>
  );
}

//Export App.js to be able to render all application in root.render method in index.js file
export default App;
