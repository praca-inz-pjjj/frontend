import React from "react";

const WideBox = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg px-4 md:px-20 py-10 w-full max-w-screen-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default WideBox;
