import React, { useEffect, useState } from 'react';
import StoryGame from './StoryGame';
import Nav from "./Component/Nav.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Play from './Pages/Play.js';
import HomePage from './Pages/HomePage.js';

function App() {
  const [data, setData] = useState('');

  //const location = useLocation();

  //const noStoryGame = ['/about', '/services', '/contact'];

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

        </Routes>
      </Router>

      {/* {!noStoryGame.includes(location.pathname) && <StoryGame />} */}
      {/* <StoryGame /> */}
    </div>
  );
}

export default App;
