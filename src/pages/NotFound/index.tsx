import React from "react";
import strings from "./strings";

const NotFoundPage = (): JSX.Element => {
	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	return (
		<div>
			<h3>{strings.title}</h3>
			<p>{strings.message}</p>
		</div>
	);
};

export default NotFoundPage;
