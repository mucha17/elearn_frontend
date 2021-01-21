import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import LessonForm from "../../components/LessonForm";

class AdminLesson extends React.Component {
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
        const title = "Admin " + (id === "new" ? "nowa lekcja" : "edytuj lekcję " + id);

        const object = {
            id: 0,
            title: "Titel",
            description: "opis",
            type: "document",
            is_url: true,
            content: "url",
            course_id: 2,
            module_id: 2,
        };

        return (
            <Layout
                header={{
                    title,
                    description: "Strona admina do edycji i tworzenia lekcji"
                }}
                title={title} smallTiles leftMenu={leftMenu} hideAll>
                <LessonForm {...object} />
            </Layout>
        );
    }
}

export default withRouter(AdminLesson);
