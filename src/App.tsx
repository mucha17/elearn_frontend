import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/Default";

const App = (): JSX.Element => {
	return (
		<ReactKeycloakProvider
			authClient={keycloak}
			onEvent={(event, error) => {
				console.log("onKeycloakEvent", event, error);
			}}
			onTokens={(tokens) => {
				console.log("onKeycloakTokens", tokens);
			}}
		>
			<BrowserRouter>
				<AppLayout />
			</BrowserRouter>
		</ReactKeycloakProvider>
	);
};

export default App;
