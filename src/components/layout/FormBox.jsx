import React from 'react';

const FormBox = ({ children }) => {
    return (
        <div className="w-full">
            <section className="flex justify-center overflow-y-auto overflow-y-visible  sm:mt-12 md:mt-24">
                <div className="bg-white sm:rounded-lg shadow-lg w-full max-w-md p-8 space-y-4">
                    {children}
                </div>
            </section>
        </div>
    );
};

export default FormBox;
