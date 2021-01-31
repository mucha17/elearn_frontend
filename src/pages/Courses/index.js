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

        courses = await database.get("courses/get");
        leftMenu = courses;

        for (let menuItem in leftMenu) {
            leftMenu[menuItem].url = "/admin/courses/" + leftMenu[menuItem].id;
            leftMenu[menuItem].to = "/admin/courses/" + leftMenu[menuItem].id;
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
                />
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
                    Component={({name}) => <div className="error">{name}</div>}
                    linkSingle={`courses`}
                    noDelete
                    filterKeys={{
                        skip: ["id"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(Courses);
