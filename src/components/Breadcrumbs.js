import React from "react";
import {NavLink} from "react-router-dom";

const Breadcrumbs = () => {
    const url = window.location.href;
    const crumbs = url.replace(window.location.origin, "").split("/");

    crumbs.shift()
    if (crumbs[crumbs.length - 1] === "") {
        crumbs.pop();
    }
    crumbs.unshift('');

    let realLink = "";

    return (
        <div className={'breadcrumbs-wrapper'}>
            {crumbs.map((crumb, id) => {
                if (crumb.length !== 0) {
                    realLink = realLink + "/" + crumb;
                }

                return (
                    <div className={'breadcrumb'}>
                        <NavLink to={realLink} key={'breadcrumb-' + id}>
                            /{crumb.length === 0 ? "home" : crumb}
                        </NavLink>
                    </div>
                )
            })}
        </div>
    );
};


export default Breadcrumbs;
