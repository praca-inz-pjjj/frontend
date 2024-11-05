import React, { FC } from "react";
import { Link } from "react-router-dom";
import { BTN_CLASSES } from "./style";


interface OrangeLinkButtonProps {
    to: string,
    text: string
}

const OrangeLinkButton: FC<OrangeLinkButtonProps> = ({
    to = "/",
    text = "Button",
}) => {
    return (
        <Link
        to={to}
        className={'bg-primorange text-white hover:bg-primdarkorange focus:ring-primorange ' + BTN_CLASSES}
      >
        {text}
      </Link>
    )
}

export default OrangeLinkButton