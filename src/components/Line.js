import React from "react";

const Line = ({ linePath }) => {
  return <path d={linePath} fill="none" stroke="black" strokeWidth={2} />;
};

export default Line;
