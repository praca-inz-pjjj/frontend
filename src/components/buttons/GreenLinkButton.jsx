import React, { FC } from "react";
import { Link } from "react-router-dom";
import { BTN_CLASSES } from "./style";

interface GreenLinkButtonProps {
    to: string,
    text: string
}

const GreenLinkButton: FC<GreenLinkButtonProps> = ({
    to = "/",
    text = "Button",
}) => {
    return (
        <Link
        to={to}
        className={'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 ' + BTN_CLASSES}
      >
        {text}
      </Link>
    )
}

export default GreenLinkButton