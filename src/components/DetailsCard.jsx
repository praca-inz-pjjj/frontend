import React from "react";

const DetailsCard = ({ 
  title, 
  headerContent, 
  children, 
  className = "", 
  titleClassName = "" 
}) => {
  return (
    <div className={`overflow-x-auto mb-12 px-4 pt-3 pb-6 bg-white border border-slate-200 rounded-lg shadow-lg ${className}`}>
      {title && <h3 className={`text-xl mb-4 ${titleClassName}`}>{title}</h3>}
      {headerContent && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          {headerContent}
        </div>
      )}
      {children}
    </div>
  );
};

export default DetailsCard;
