import React, { FC, ReactNode } from 'react';

interface InfoCardContainerProps {
    title: string;
    children: ReactNode;
}

const InfoCardContainer: FC<InfoCardContainerProps> = ({ title, children }) => {
    return (
        <div className="overflow-x-auto mb-6 px-4 pt-3 pb-6 bg-white border border-slate-200 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {children}
            </div>
        </div>
    );
};

export default InfoCardContainer;
