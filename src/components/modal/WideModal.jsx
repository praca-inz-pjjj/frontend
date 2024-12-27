import React from 'react';


function WideModal({ children, title, subtitle="", action_buttons, isOpen }) {
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
            <div className="flex justify-center items-center min-h-screen px-2 sm:px-4">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="flex flex-col overflow-visible space-y-8 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-3xl w-full px-6 py-4" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="flex flex-col space-y-2">
                        <h3 className="text-xl font-medium text-gray-900" id="modal-headline">
                            {title}
                        </h3>
                        { subtitle && <p className="text-sm text-gray-500">{subtitle}</p> }
                    </div>
                    {children}
                    <div className="flex justify-between sm:justify-end space-x-2">
                        {action_buttons}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WideModal;