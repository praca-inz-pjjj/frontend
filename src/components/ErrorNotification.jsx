import React, { useState, useEffect } from 'react';
// import { AiOutlineExclamationCircle } from 'react-icons/ai'; // Import ikony wykrzyknika

const ErrorNotification = ({ message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible || !message) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white border text-black p-4 rounded-lg shadow-lg flex items-center">
            {/* <AiOutlineExclamationCircle className="text-red-500 text-2xl mr-2" /> */}
            <div className="flex-grow">
                <span>{message}</span>
            </div>
            <button
                onClick={handleClose}
                className="ml-4 bg-red-600 text-white px-3 py-1 rounded-lg transition duration-600 hover:bg-red-700 focus:outline-none"
            >
                Zamknij
            </button>
        </div>
    );
};

export default ErrorNotification;
