import React, { useEffect, useState } from 'react';
import StoryGame from './StoryGame';
import Nav from "./Component/Nav.js";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Play from './Pages/Play.js';
import HomePage from './Pages/HomePage.js';
import NotFoundPage from './components/NotFound.js';
import Footer from './components/Footer.js';

function App() {
  const [data, setData] = useState('');

  
  useEffect(() => {
    fetch('/')
      .then(res => res.text())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element= {<HomePage />}/>
          <Route path="/play" element= {<Play />}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Router>

    <Footer/>
    </div>
  );
}

export default App;
