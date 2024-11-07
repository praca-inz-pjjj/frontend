import React from 'react';

const Body = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-sky-100 min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default Body;
