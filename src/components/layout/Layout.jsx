import React from "react";
import Body from "../Body";
import { Navigation } from "../navigation/Navigation";
import Footer from "../footer/Footer";
import Background from "./Background";

const Layout = ({ children }) => {
    return (
        <Body>
            <Background>
            <Navigation />
            {children}
            <Footer />
            </Background>
        </Body>
    );
    }

export default Layout;