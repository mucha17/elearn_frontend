import React from "react";
import strings from "./strings";
import { NavLink } from "react-router-dom";

interface ForbiddenPageParams {
	onlyAuthenticated: boolean;
}

const ForbiddenPage = ({
	onlyAuthenticated,
}: ForbiddenPageParams): JSX.Element => {
	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	return (
		<div className="loader-wrapper">
			<div className="loader">
				<h3>{strings.title}</h3>
				<p>
					{onlyAuthenticated
						? strings.messages.requiresLogin
						: strings.messages.noPermissions}
				</p>
				<div className={"link"}>
					<NavLink to={"/home"}>Powrót na stronę główną</NavLink>
				</div>
			</div>
		</div>
	);
};

export default ForbiddenPage;
