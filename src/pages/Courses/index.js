import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader";
import Lister from "../../components/lister";
import Tile from "../../components/Tile";
import database from "../../database"

class Courses extends React.Component {
    state = {
        courses: [],
        leftMenu: []
    }

    async componentDidMount() {
        let {courses, leftMenu} = this.state;

        courses = await database.get("courses");
        leftMenu = courses;

        for (let menuItem in leftMenu) {
            leftMenu[menuItem].url = "/courses/" + leftMenu[menuItem].id;
            leftMenu[menuItem].to = "/courses/" + leftMenu[menuItem].id;
        }

        this.setState({courses, leftMenu});
    }

    render() {
        const {leftMenu, courses} = this.state;

        if (courses.length === 0) {
            return (
                <Layout
                    header={{title: "Kursy", description: "Strona admina ze wszystkimi kursami"}}
                    title="Kursy"
                    smallTiles
                    leftMenu={leftMenu}
                    hideAll
                >
                    Brak kursów
                </Layout>
            )
        }

        return (
            <Layout
                header={{title: "Kursy", description: "Strona ze wszystkimi kursami"}}
                title="Kursy"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Lister
                    name={'Kursy'}
                    items={courses}
                    Component={({name}) => <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "100%"
                    }}>{name}</div>}
                    linkSingle={`courses`}
                    noDelete
                    filterKeys={{
                        skip: ["id", "key", "condition", "created_at", "updated_at", "url", "to"],
                        only: ["name"],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(Courses);
