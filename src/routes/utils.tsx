import * as React from "react";
import type { RouteProps } from "react-router-dom";
import { Route, RouteComponentProps } from "react-router-dom";
import Forbidden from "../pages/Forbidden";

interface PrivateRouteParams extends RouteProps {
	component:
		| React.ComponentType<RouteComponentProps<any>>
		| React.ComponentType<any>;
	authenticated: boolean | undefined;
	roles: string[] | undefined;
	accessLevel: string;
}

export const PrivateRoute = ({
	component: Component,
	authenticated,
	roles,
	accessLevel,
	...rest
}: PrivateRouteParams): JSX.Element => {
	if (accessLevel === "none") {
		return (
			<Route {...rest}>
				<Forbidden onlyAuthenticated={false} />
			</Route>
		);
	}

	if (accessLevel === "authenticated") {
		if (authenticated === true) {
			return (
				<Route {...rest} render={(props) => <Component {...props} />} />
			);
		} else {
			return (
				<Route {...rest}>
					<Forbidden onlyAuthenticated={true} />
				</Route>
			);
		}
	}

	if (accessLevel === "full") {
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	}

	if (authenticated === true) {
		if (accessLevel === "authenticated") {
			return (
				<Route {...rest} render={(props) => <Component {...props} />} />
			);
		}
		if (roles?.includes(accessLevel)) {
			return (
				<Route {...rest} render={(props) => <Component {...props} />} />
			);
		} else {
			return (
				<Route {...rest}>
					<Forbidden onlyAuthenticated={false} />
				</Route>
			);
		}
	}

	return (
		<Route {...rest}>
			<Forbidden onlyAuthenticated={false} />
		</Route>
	);
};
