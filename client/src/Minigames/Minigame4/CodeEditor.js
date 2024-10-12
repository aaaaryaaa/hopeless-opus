import React from 'react';

const CodeEditor = ({ code, setCode }) => {
  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
        style={{ fontFamily: 'monospace',width:'100%',height:'400px', paddingTop: "0", paddingLeft: "5em", fontSize: "1.5em"}}
      />
    </div>
  );
};

export default CodeEditor;
