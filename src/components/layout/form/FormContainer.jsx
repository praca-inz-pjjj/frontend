import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <div className="w-full">
            <section className="flex justify-center overflow-y-auto overflow-y-visible sm:mt-12 md:mt-24">
                <div className="bg-white sm:rounded-lg sm:shadow-lg w-full max-w-md p-6 sm:p-8 pt-6 space-y-8 sm:space-y-4">
                    {children}
                </div>
            </section>
        </div>
    );
};

export default FormContainer;
