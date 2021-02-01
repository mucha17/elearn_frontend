import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import CourseForm from "../../components/CourseForm";
import database from "../../database"

class AdminCourse extends React.Component {
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
            object = await database.get('courses/' + id);
        }

        this.setState({object})
    }

    render() {
        const {leftMenu, object} = this.state;
        const {id} = this.props.match.params;
        const is_new = id === "new";
        const title = "Admin " + (is_new ? "nowy kurs" : "edytuj kurs " + id);

        return (
            <Layout header={{
                title,
                description: "Strona admina do edycji i tworzenia kursów"
            }} title={title} leftMenu={leftMenu} hideAll>
                {is_new ? <CourseForm/> : <CourseForm {...object} />}
            </Layout>
        );
    }
}

export default withRouter(AdminCourse);
