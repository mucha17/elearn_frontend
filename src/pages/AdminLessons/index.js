import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";

class AdminLessons extends React.Component {
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
        lessons: []
    }

    getCreatingItem = () => {
        return {
            id: 0,
            title: "Nowy",
            description: "Przejdź tutaj aby utworzyć nową lekcję.",
            url: "/admin/lessons/new",
        };
    }


    async componentDidMount() {
        let {lessons} = this.state;

        lessons = await fetch('http://localhost:8080/api/lessons')
            .then(res => res.json())
            .then(data => {
                return data || [];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
        lessons.unshift(this.getCreatingItem());

        this.setState({lessons});
    }


    render() {
        const {leftMenu, lessons} = this.state;

        if (lessons.length === 0) {
            return <Layout
                header={{title: "Admin - lekcje", description: "Strona admina ze wszystkimi lekcjami"}}
                title="Admin - lekcje"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Loader/>
            </Layout>
        }
        return (
            <Layout
                header={{title: "Admin - lekcje", description: "Strona admina ze wszystkimi lekcjami"}}
                title="Admin - lekcje"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                {lessons.map((lesson) => (
                    <ItemTile
                        key={lesson.id}
                        title={lesson.title}
                        description={lesson.description}
                        url={lesson.url}
                        type={lesson.id === 0 ? "default" : "edit"}
                    />
                ))}
            </Layout>
        );
    }
}

export default withRouter(AdminLessons);
