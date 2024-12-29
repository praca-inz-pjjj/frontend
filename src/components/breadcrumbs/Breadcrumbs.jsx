import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbsSeparator from "./BreadcrumbsSeparator";
import BreadcrumbsBackButton from "./BreadcrumbsBackButton";

const Breadcrumbs = ({ breadcrumbs, backTo="" }) => {
    const BaseCrumbClass = ""
    const LinkCrumbClass = "hover:text-black hover:underline" + BaseCrumbClass;
    const ActiveCrumbClass = "text-black font-semibold " + BaseCrumbClass;
    const navigate = useNavigate();

    const handleBack = () => {
      if (backTo !== "") {
        navigate(backTo);
      } else {
        navigate(-1);
      }
    };

    return (
        <div className="flex items-center mb-12">
            <BreadcrumbsBackButton onClick={handleBack} />
            <h2 className="text-gray-600 flex items-center">
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                        {crumb.link ? (
                            <Link to={crumb.link} className={LinkCrumbClass}>
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className={crumb.isActive ? ActiveCrumbClass : BaseCrumbClass}>
                                {crumb.label}
                            </span>
                        )}
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbsSeparator />
                        )}
                    </React.Fragment>
                ))}
            </h2>
        </div>
    );
};

export default Breadcrumbs;
