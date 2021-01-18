import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { useKeycloak } from "@react-keycloak/web";

import { PrivateRoute } from "./utils";
import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";
import Layout from "../components/Layout";
import { routes } from "./data";
/*

  Access Levels:
  - full : unlimited access to content
  - none : access to content forbidden for everyone
  - ROLE_* : access only for users with specified role

 */

export const AppRouter = () => {
	const { keycloak } = useKeycloak();

	const userRoles = keycloak.tokenParsed
		? keycloak?.tokenParsed?.resource_access?.website?.roles
		: undefined;

	return (
		<Switch>
			{routes.map((route) => (
				<Route
					key={route.id}
					exact={route.exact}
					path={route.to}
					component={() => route.component}
				/>
			))}
			<Route>
				<NotFoundPage />
			</Route>
		</Switch>
	);
};
