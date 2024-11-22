import React from 'react';

const CenteredContainer = ({ children }) => {
    return (
        <div className="w-full">
            <section className="flex items-start mt-16 sm:mt-28 overflow-y-auto justify-center overflow-y-visible">
                <div className="flex flex-col items-center bg-white rounded-lg shadow-lg w-full max-w-md">
                    <div className="py-8 px-6 space-y-4 sm:px-12 w-full">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CenteredContainer;
