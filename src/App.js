import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar"
import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"

function App() {
  document.body.style.backgroundColor = '#fff7dd';
  return (
    <div className='Main'>
      <Router>
        <Navbar />
        <div className = "Content">
          <Routes>
            <Route path = '/' element={<Home />} />
            <Route path = '/about' element={<About />} />
            <Route path = '/contact' element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
