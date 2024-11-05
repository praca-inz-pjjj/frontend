import React, { FC } from "react";
import { Link } from "react-router-dom";
import { BTN_CLASSES } from "./style";

interface BlueLinkButtonProps {
    to: string,
    text: string
}

const BlueLinkButton: FC<BlueLinkButtonProps> = ({
    to = "/",
    text = "Button",
}) => {
    return (
        <Link
        to={to}
        className={'bg-primblue text-white hover:bg-primdarkblue focus:ring-primblue ' + BTN_CLASSES}
      >
        {text}
      </Link>
    )
}

export default BlueLinkButton