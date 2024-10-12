import React from 'react';

const Output = ({ output }) => {
  return (
    <div>
      <h2 className='text-gray-200 underline underline-offset-2'>Output</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default Output;
