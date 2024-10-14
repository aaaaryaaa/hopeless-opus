import React from 'react'
import './Play.css'
import StoryGame from '../StoryGame'
import ImageHoverEffect from '../Component/ImageHoverEffect'

const Play = () => {
  return (
    <div className="h-[100vh]">
      <ImageHoverEffect />
      <StoryGame />
    </div>
  )
}

export default Play
