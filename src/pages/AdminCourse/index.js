import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import CourseForm from "../../components/CourseForm";

class AdminCourse extends React.Component {
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
        const title = "Admin "+(id === "0" ? "nowy kurs" : "edytuj kurs " + id);

        //TODO: fetch course
        const object = {
            title: "title",
            description: "description",
            id: 1,
        };
        return (
            <Layout header={{
                title,
                description: "Strona admina do edycji i tworzenia kursów"
            }} title={title} leftMenu={leftMenu} hideAll>
                <CourseForm {...object} />
            </Layout>
        );
    }
}

export default withRouter(AdminCourse);
