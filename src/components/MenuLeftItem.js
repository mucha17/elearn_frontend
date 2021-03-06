import React from "react";
import {NavLink} from "react-router-dom";

const MenuLeftItem = ({name, to, action, condition}) => {
    condition = condition === undefined ? true : condition;
    action = action ?? false;

    if (condition) {
        if (action) {
            return (
                <div onClick={() => action()}>
                    <div className={"menu-item left"}>{name}</div>
                </div>
            );
        } else {
            return (
                <NavLink to={to}>
                    <div className={"menu-item left"}>{name}</div>
                </NavLink>
            );
        }
    } else {
        return <></>;
    }
};

export default MenuLeftItem;
