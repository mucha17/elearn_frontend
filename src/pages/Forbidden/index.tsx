import React from "react";
import strings from "./strings";

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
		<div>
			<h3>{strings.title}</h3>
			<p>
				{onlyAuthenticated
					? strings.messages.requiresLogin
					: strings.messages.noPermissions}
			</p>
		</div>
	);
};

export default ForbiddenPage;
