import React, { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import { BTN_CLASSES, COLOR_CLASSES } from "./style";

interface ColorfulLinkButtonProps extends LinkProps {
    to: string;
    text: string;
    color?: "blue" | "orange" | "yellow" | "green" | "red" | "transparent" | "outlined" | "primary_green";
}

const ColorfulLinkButton: FC<ColorfulLinkButtonProps> = ({ 
    to, 
    text, 
    color = "blue", 
    ...props 
}) => {
    const colorClass = COLOR_CLASSES[color] || COLOR_CLASSES["blue"];

    return (
        <Link
            to={to}
            {...props}
            className={`${colorClass} ${BTN_CLASSES}`}
        >
            {text}
        </Link>
    );
};

export default ColorfulLinkButton;
