import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Navigation } from '../../components/Navigation';

export const ErrorPage = ({error_code, title, description}) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <div className='flex flex-col items-center'>
                <div className={`mt-8 bg-white shadow-md rounded-lg px-20 py-10 w-full max-w-7xl flex flex-col items-center`}>
                    <h1 className={`text-8xl font-bold`}>{`${error_code}`}</h1>
                    <h2 className="text-2xl font-semibold mt-4 ">{title}</h2>
                    <p className="mt-4 text-gray-800">{description}</p>
                    <Link to="/" className="mt-8 text-blue-600 hover:underline">
                        Wróć na stronę główną
                    </Link>
                </div>
            </div>
        </div>
    )
}

ErrorPage.propTypes = {
    error_code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
