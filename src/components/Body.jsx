import React from 'react';

const Body = ({ children }) => {
  return (
    <div className="bg-white sm:bg-sky-100 min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default Body;
