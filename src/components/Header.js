import React from "react";
import {Helmet} from "react-helmet";

const Header = ({title, description}) => {
    if (!title) {
        title = "No title given";
    }

    return (
        <Helmet>
            <title>KN IoTes | {title.toString().toLocaleLowerCase()}</title>
            <meta name="description" content={description || "Strona bez opisu"}/>
        </Helmet>
    );
};

export default Header;
