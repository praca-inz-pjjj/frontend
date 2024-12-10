import React from 'react';

const BreadcrumbsBackButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="text-gray-600 hover:text-black mr-4 p-3 rounded-full bg-gray-100 hover:bg-gray-200"
    >
        <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    </button>
)

export default BreadcrumbsBackButton;