import React from 'react';

const CodeEditor = ({ code, setCode }) => {
  return (
    <div>
      <h2>Code Editor</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
        style={{ fontFamily: 'monospace',width:'100%',height:'400px'}}
      />
    </div>
  );
};

export default CodeEditor;
