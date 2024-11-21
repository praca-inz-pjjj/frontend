import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CARD_BG_CLASSES, CARD_ICON_CLASSES, CARD_RING_CLASSES, CARD_TEXT_CLASSES } from './buttons/style';

interface InfoCardProps {
    title: string;
    description: string;
    color?: "blue" | "orange" | "yellow" | "green" | "red" | "transparent";
    icon?: React.ReactNode;
    href?: string;  // Optional, renders as a link if provided
    onClick?: () => void;  // Optional, renders as a button if provided
}

const InfoCard: FC<InfoCardProps> = ({ title, description, color = "green", icon, href, onClick }) => {
    const bgColor = CARD_BG_CLASSES[color];
    const ringColor = CARD_RING_CLASSES[color];
    const textColor = CARD_TEXT_CLASSES[color];
    const iconColor = CARD_ICON_CLASSES[color];
    const cardClasses = `flex flex-col justify-start group block min-w-[100%] mx-auto rounded p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 transition-all duration-200 ease-in-out ${bgColor} ${ringColor}`;
    const headerClasses = `text-slate-900 text-sm font-semibold ${textColor}`;
    const descriptionClasses = `text-left text-slate-500 text-sm ${textColor}`;

    // Determine if the component should render as a link or a button
    const Wrapper = href ? Link : 'button';
    const wrapperProps = href ? { to: href } : { onClick };

    return (
        React.createElement(
            Wrapper,
            { ...wrapperProps, className: cardClasses },
            <>
            <div className="flex items-center space-x-3">
                 {icon && <span className={iconColor}>{icon}</span>}
                 <h3 className={headerClasses}>
                     {title}
                 </h3>
                </div>
            <p className={descriptionClasses}>
                {description}
            </p>
            </>
        )
    );
};

export default InfoCard;
