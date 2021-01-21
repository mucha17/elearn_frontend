import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ModuleForm from "../../components/ModuleForm";

class AdminModule extends React.Component {
    render() {
        const leftMenu = [
            {
                id: 0,
                name: "Kursy",
                to: "/admin/courses/",
            },
            {
                id: 1,
                name: "Moduły",
                to: "/admin/modules/",
            },
            {
                id: 2,
                name: "Lekcje",
                to: "/admin/lessons/",
            },
        ];
        const {id} = this.props.match.params;
        const title = "Admin "+(id === "new" ? "nowy moduł" : "edytuj moduł " + id);

        const object = {
            title: "title",
            description: "description",
            id: 1,
            course_id: 2,
        };

        return (
            <Layout
                header={{title, description: "Strona admina do edycji i tworzenia modułów"}}
                title={title} smallTiles leftMenu={leftMenu} hideAll>
                <ModuleForm {...object} />
            </Layout>
        );
    }
}

export default withRouter(AdminModule);
