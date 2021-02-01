import React from "react";
// import {ReactKeycloakProvider} from "@react-keycloak/web";
// import keycloak from "./keycloak";
import {BrowserRouter} from "react-router-dom";
import AppLayout from "./layouts/Default";
import store from "./redux/store";
import {Provider} from "react-redux"

const App = () => {
    return (
        <Provider store={store}>
            {/*<ReactKeycloakProvider*/}
            {/*    authClient={keycloak}*/}
            {/*    onEvent={(event, error) => {*/}
            {/*        console.log("onKeycloakEvent", event, error);*/}
            {/*    }}*/}
            {/*    onTokens={(tokens) => {*/}
            {/*        console.log("onKeycloakTokens", tokens);*/}
            {/*    }}*/}
            {/*>*/}
                <BrowserRouter>
                    <AppLayout/>
                </BrowserRouter>
            {/*</ReactKeycloakProvider>*/}
        </Provider>
    );
};

export default App;
