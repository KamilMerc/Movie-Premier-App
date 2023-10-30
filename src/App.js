//Imports
import "./scss/App.scss";
import Home from "./pages/Home";
import Error from "./pages/Error";
import DetailPage from "./pages/DetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  ScrollToTop  from "./components/ScrollToTop"


function App() {

  return (
    <div className="App">
     <Router>
      <ScrollToTop>
      <Routes>
          <Route index element={<Home/>}></Route>
          <Route path="movie/:id" element={<DetailPage/>}></Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
      </ScrollToTop>
     </Router>
    </div>
  );
}

//Export App.js to be able to render all application in root.render method in index.js file
export default App;
