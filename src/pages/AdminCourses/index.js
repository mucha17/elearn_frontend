import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";

class AdminCourses extends React.Component {
    state = {
        courses: [],
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
        ]
    }

    getCreatingItem = () => {
        return {
            id: 0,
            title: "Nowy",
            description: "Przejdź tutaj aby utworzyć nowy kurs.",
            url: "/admin/courses/new",
        };
    }

    async componentDidMount() {
        let {courses} = this.state;

        courses = await fetch('http://localhost:8080/api/courses')
            .then(res => res.json())
            .then(data => {
                return data || [];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
        courses.unshift(this.getCreatingItem());

        this.setState({courses});
    }

    render() {
        const {leftMenu, courses} = this.state;

        if (courses.length === 0) {
            return <Layout
                header={{title: "Admin - kursy", description: "Strona admina ze wszystkimi kursami"}}
                title="Admin - kursy"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Loader />
            </Layout>
        }
        return (
            <Layout
                header={{title: "Admin - kursy", description: "Strona admina ze wszystkimi kursami"}}
                title="Admin - kursy"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                {courses.map((course) => (
                    <ItemTile
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        url={course.url}
                        type={course.id === 0 ? "default" : "edit"}
                    />
                ))}
            </Layout>
        );
    }
}

export default withRouter(AdminCourses);
