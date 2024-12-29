import React from 'react';

const Title = ({title, className=""}) => {
    return (
        <h1 className={`text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl ${className}`}>
            {title}
        </h1>
    );
}

export default Title;