import React from "react";
import MenuLeft from "./MenuLeft";
import MenuTop from "./MenuTop";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import Notifications from "./Notifications";

const Layout = ({children, header, title, smallTiles, leftMenu, hideAll}) => (
    <div className={"layout"}>
        <Header {...header} />
        <MenuTop/>
        <div className={"site-wrapper"}>
            <MenuLeft items={leftMenu} hideAll={hideAll}/>
            <Notifications/>
            <div className={"content-wrapper"}>
                <Breadcrumbs/>
                {title && <h1 className={"site-title"}>{title}</h1>}
                <div
                    className={`${smallTiles ? "content-wrapper-small" : null}`}
                >
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default Layout;
