import React from 'react';

const Output = ({ output }) => {
  return (
    <div>
      <h2 className='text-white bg-black rounded-lg shadow-lg opacity-80 underline underline-offset-2'>Output</h2>
      <pre className='text-white bg-black rounded-lg shadow-lg opacity-80'>{output}</pre>
    </div>
  );
};

export default Output;
