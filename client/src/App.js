import React, { useEffect, useState } from 'react'
import StoryGame from './StoryGame.js'
import Nav from './Component/Nav.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Play from './Pages/Play.js'
import HomePage from './Pages/HomePage.js'
import NotFoundPage from './Component/NotFound.js'
import Register from './Component/Register.js'
import Login from './Component/Login.js'
import Info from './Component/Info.js'
import StoryError from './Component/StoryError.js'
import Contact from './Component/contactform.js'
import Leaderboard from './Pages/Leaderboard.js'

function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    fetch('/')
      .then((res) => res.text())
      .then((data) => setData(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <Router>
        <Nav />
        <div className="h-28 bg-black"></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<Play />} />
          <Route path="/about" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/storyerror" element={<StoryError />} />
          {/* <Route path="/playparallax" element={<PlayParallax />} /> */}
        </Routes>
      </Router>

      {/* Uncomment this line to include StoryGame conditionally */}
      {/* <StoryGame /> */}
    </div>
  )
}

export default App
