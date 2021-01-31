import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ModuleForm from "../../components/ModuleForm";
import database from "../../database";
import CourseForm from "../../components/CourseForm";

class AdminModule extends React.Component {
    state = {
        leftMenu: [
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
        ],
        object: {}
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        let {object} = this.state;
        const is_new = id === "new";

        if (!is_new) {
            object = await database.get('modules/get/' + id);
        }

        this.setState({object})
    }

    render() {
        const {leftMenu} = this.state;
        const {id} = this.props.match.params;
        const is_new = id === "new";
        const title = "Admin " + (is_new ? "nowy moduł" : "edytuj moduł " + id);
        let object;

        return (
            <Layout
                header={{title, description: "Strona admina do edycji i tworzenia modułów"}}
                title={title} smallTiles leftMenu={leftMenu} hideAll>
                {is_new ? <ModuleForm/> : <ModuleForm {...object} />}
            </Layout>
        );
    }
}

export default withRouter(AdminModule);
