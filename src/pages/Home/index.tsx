import React from "react";
import strings from "./strings";

const HomePage = (): JSX.Element => {
	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	return <div>Strona glowna</div>;
};

export default HomePage;
