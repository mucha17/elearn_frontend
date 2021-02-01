import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";

class Login extends React.Component {
    render() {
        return (
            <Layout
                header={{title: 'Logowanie'}}
                title={`Logowanie`}
                smallTiles
            >
                Logowanie
            </Layout>
        );
    }
}

export default withRouter(Login);
