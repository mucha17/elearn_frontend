import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader";
import Lister from "../../components/lister";
import Tile from "../../components/Tile";
import database from "../../database"

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

    async componentDidMount() {
        let {courses} = this.state;

        courses = await database.get("courses");

        this.setState({courses});
    }

    render() {
        const {leftMenu, courses} = this.state;

        if (courses.length === 0) {
            return (
                <Layout
                    header={{title: "Admin - kursy", description: "Strona admina ze wszystkimi kursami"}}
                    title="Admin - kursy"
                    smallTiles
                    leftMenu={leftMenu}
                    hideAll
                >
                    <Tile title={"Akcje"}>
                        <NavLink to={'/admin/courses/new'}>
                            <input type={'button'} value={'Stwórz nowy'}/>
                        </NavLink>
                    </Tile>
                    <Loader/>
                </Layout>
            )
        }
        return (
            <Layout
                header={{title: "Admin - kursy", description: "Strona admina ze wszystkimi kursami"}}
                title="Admin - kursy"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Tile title={"Akcje"}>
                    <NavLink to={'/admin/courses/new'}>
                        <input type={'button'} value={'Stwórz nowy'}/>
                    </NavLink>
                </Tile>
                <Lister
                    name={'Kursy'}
                    items={courses}
                    Component={({name}) => <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "100%"
                        }}>{name}</div>}
                    actionDelete={async (id) => database.remove('courses/delete/' + id)}
                    linkSingle={`admin/courses/`}
                    filterKeys={{
                        skip: ["id", "to", "created_at", "updated_at", "url"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminCourses);
