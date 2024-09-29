import React, { useEffect, useState } from 'react';

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
      <h1>MERN App</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
