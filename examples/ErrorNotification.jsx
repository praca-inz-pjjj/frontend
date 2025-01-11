import { useState } from 'react';

const ErrorNotification = ({ message }) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible || !message) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white border text-black p-4 rounded-lg shadow-lg flex items-center">
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