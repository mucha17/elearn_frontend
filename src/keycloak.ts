import Keycloak from "keycloak-js";

const keycloak = Keycloak({
	realm: process.env.REACT_APP_KEYCLOAK_REALM ?? "default",
	url: process.env.REACT_APP_KEYCLOAK_URL ?? "default",
	clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID ?? "default",
});

export default keycloak;
