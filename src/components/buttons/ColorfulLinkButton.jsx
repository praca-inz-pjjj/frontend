import React, { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import { BTN_CLASSES, BTN_COLORS, BTN_HOVER_CLASSES } from "./style";

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
    const colorClass = BTN_COLORS[color] || BTN_COLORS["blue"];
    const colorHoverClass = BTN_HOVER_CLASSES[color] || BTN_HOVER_CLASSES["blue"];

    return (
        <Link
            to={to}
            {...props}
            className={`${colorClass} ${colorHoverClass} ${BTN_CLASSES}`}
        >
            {text}
        </Link>
    );
};

export default ColorfulLinkButton;
