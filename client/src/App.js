import React, { useEffect, useState } from 'react';
import StoryGame from './StoryGame';

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
      <StoryGame />
    </div>
  );
}

export default App;
