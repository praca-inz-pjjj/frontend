import React, { FC, ButtonHTMLAttributes } from "react";
import { BTN_CLASSES, COLOR_CLASSES } from "./style";

interface ColorfulButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    color?: "blue" | "orange" | "yellow" | "green" | "red";
    onClick?: () => void;
}

const ColorfulButton: FC<ColorfulButtonProps> = ({ text, color = "blue", onClick, ...props }) => {
    const colorClass = COLOR_CLASSES[color] || COLOR_CLASSES["blue"];

    return (
        <button
            {...props}
            onClick={onClick}
            className={`${colorClass} ${BTN_CLASSES}`}
        >
            {text}
        </button>
    );
};

export default ColorfulButton;
