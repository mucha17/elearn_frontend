import React from "react";
import {NavLink} from "react-router-dom";

const MenuTopItem = ({name, to, action, condition}) => {
    condition = condition ?? true;
    action = action ?? false;

    if (condition) {
        if (action) {
            return (
                <div onClick={() => action()}>
                    <div className={"menu-item top"}>{name}</div>
                </div>
            );
        } else {
            return (
                <NavLink to={to}>
                    <div className={"menu-item top"}>{name}</div>
                </NavLink>
            );
        }
    } else {
        return <></>;
    }
};

export default MenuTopItem;
