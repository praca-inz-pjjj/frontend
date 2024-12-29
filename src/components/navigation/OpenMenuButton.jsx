import React from "react";


const OpenMenuButton = ({ setIsSlideOutMenuOpen }) => {
    return (
        <button
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
          aria-controls="slideout-menu"
          aria-expanded={false}
          onClick={() => setIsSlideOutMenuOpen(isOpen => !isOpen)}
        >
          <span className="sr-only">Otwórz menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16"></path>
          </svg>
        </button>
    )
}

export default OpenMenuButton;