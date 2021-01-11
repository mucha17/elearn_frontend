import React from "react";
import strings from "./strings";
import { NavLink } from "react-router-dom";

const NotFoundPage = (): JSX.Element => {
	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	return (
		<div className="loader-wrapper">
			<div className="loader">
				<h3>{strings.title}</h3>
				<p>{strings.message}</p>
				<div className={"link"}>
					<NavLink to={"/home"}>Powrót na stronę główną</NavLink>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
