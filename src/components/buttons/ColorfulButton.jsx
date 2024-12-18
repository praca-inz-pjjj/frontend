import React, { FC, ButtonHTMLAttributes } from "react";
import { BTN_CLASSES, BTN_DISABLED, BTN_COLORS, BTN_HOVER_CLASSES } from "./style";

interface ColorfulButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    color?: "blue" | "orange" | "yellow" | "green" | "red" | "slate" | "primary_green" | "primary_blue";
    onClick?: () => void;
}

const ColorfulButton: FC<ColorfulButtonProps> = ({ text, color = "blue", onClick, ...props }) => {
    const colorClass = BTN_COLORS[color] || BTN_COLORS["blue"];
    const colorHoverClass = BTN_HOVER_CLASSES[color] || BTN_HOVER_CLASSES["blue"];

    return (
        <button
            {...props}
            onClick={onClick}
            className={`${colorClass} ${BTN_CLASSES} ${props.disabled ? BTN_DISABLED : colorHoverClass} ${props.className}`}
        >
            {text}
        </button>
    );
};

export default ColorfulButton;
