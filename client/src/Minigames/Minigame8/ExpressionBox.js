// src/components/ExpressionBox.js
import React from "react";

const ExpressionBox = ({
  expression1,
  expression2,
  onClickGreater,
  onClickLesser,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <div
        className="flex-1 p-8 bg-blue-600 text-white text-center text-xl rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300"
        onClick={onClickGreater}
      >
        {expression1}
      </div>
      <div
        className="flex-1 p-8 bg-green-600 text-white text-center text-xl rounded-lg shadow-lg cursor-pointer hover:bg-green-700 transition duration-300"
        onClick={onClickLesser}
      >
        {expression2}
      </div>
    </div>
  );
};

export default ExpressionBox;
