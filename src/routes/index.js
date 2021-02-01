import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import {useKeycloak} from "@react-keycloak/web";

import NotFoundPage from "../pages/NotFound";
import {routes} from "./data";
import ForbiddenPage from "../pages/Forbidden";
/*

  Access Levels:
  - full : unlimited access to content
  - none : access to content forbidden for everyone
  - ROLE_* : access only for users with specified role

 */

export const AppRouter = () => {
    const userRole = localStorage.getItem('user');

    return (
        <Switch>
            {routes.map((route) => {
                route.role = route.role ? route.role : "token_user";

                if (userRole === "token_user" && route.role === "token_admin") {
                    return <ForbiddenPage onlyAuthenticated={false}/>
                }

                return <Route
                    key={route.key}
                    exact={route.exact}
                    path={route.to}
                    component={() => route.component}
                />
            })}
            <Route>
                <NotFoundPage/>
            </Route>
        </Switch>
    );
};
