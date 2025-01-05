import React from "react";

const DetailsCard = ({ 
  title="", 
  headerContent=null, 
  children=null, 
  className = "", 
  titleClassName = "" 
}) => {
  return (
    <div className={`overflow-x-auto p-4 pb-4 bg-white border border-slate-200 rounded-lg shadow-lg ${className}`}>
      {title && <h3 className={`text-xl mb-2 border-b pb-3 tracking-tight leading-4 ${titleClassName}`}>{title}</h3>}
      {headerContent && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          {headerContent}
        </div>
      )}
      {children && <div className="mt-6 space-y-6">
        {children}
      </div>}
    </div>
  );
};

export default DetailsCard;
