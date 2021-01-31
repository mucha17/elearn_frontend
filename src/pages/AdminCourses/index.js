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
        leftMenu: []
    }

    async componentDidMount() {
        let {courses, leftMenu} = this.state;

        courses = await database.get("courses");
        leftMenu = courses;

        for (let menuItem in leftMenu) {
            leftMenu[menuItem].url = "/admin/courses/" + leftMenu[menuItem].id;
        }

        this.setState({courses, leftMenu});
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
                    Component={({title}) => <div className="error">{title}</div>}
                    actionDelete={(id) => console.log(id)}
                    linkSingle={`admin/courses`}
                    filterKeys={{
                        skip: ["id"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminCourses);
