import React from "react";


const InfoCardContainer = ({ style="", children }) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${style}`}>
            {children}
        </div>
    );
};

export default InfoCardContainer;