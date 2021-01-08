import React, { useState } from "react";
import "moment/locale/pl";
import strings from "./strings";
import { useKeycloak } from "@react-keycloak/web";
import { AppRouter } from "../../routes";

const AppLayout = (): JSX.Element => {
	const { initialized } = useKeycloak();

	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	if (!initialized) {
		return (
			<div>
				<p>{strings.pleaseWait}</p>
				<p>{strings.connecting}</p>
			</div>
		);
	}

	return (
		<div>
			<AppRouter />
		</div>
	);
};

export default AppLayout;
