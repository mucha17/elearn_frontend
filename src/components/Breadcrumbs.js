import React from "react";
import {NavLink} from "react-router-dom";

const Breadcrumbs = () => {
    const url = window.location.href;
    const crumbs = url.replace(window.location.origin, "").split("/");

    crumbs.shift()
    if (crumbs[crumbs.length - 1] === "") {
        crumbs.pop();
    }

    let realLink = "";

    return (
        <div className={'breadcrumbs-wrapper'}>
            {crumbs.map((crumb, id) => {
                realLink = realLink + "/" + crumb;

                return (
                    <div className={'breadcrumb'}>
                        <NavLink to={realLink} key={'breadcrumb-' + id}>
                            /{crumb}
                        </NavLink>
                    </div>
                )
            })}
        </div>
    );
};


export default Breadcrumbs;
