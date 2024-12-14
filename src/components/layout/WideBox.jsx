import React from "react";

const WideBox = ({ children, className = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-6 mb-12">
      <div
        className={`bg-white shadow-md rounded-lg px-4 md:px-10 pt-8 pb-12 w-full max-w-screen-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default WideBox;
