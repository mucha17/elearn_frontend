import React, { useState } from "react";
import "moment/locale/pl";
import strings from "./strings";
import { useKeycloak } from "@react-keycloak/web";
import { AppRouter } from "../../routes/index";

const AppLayout = (): JSX.Element => {
	const { initialized } = useKeycloak();

	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	// if (!initialized) {
	// 	return (
	// 		<div className="loader-wrapper">
	// 			<div className="loader">
	// 				<p>{strings.pleaseWait}</p>
	// 				<p>{strings.connecting}</p>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return <AppRouter />;
};

export default AppLayout;
