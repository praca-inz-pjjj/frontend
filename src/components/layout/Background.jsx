import React from 'react';

const Background = ({ children }) => {
    return (
        <div className="bg-sky-50">
            {children}
        </div>
    );
}

export default Background;