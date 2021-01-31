import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader";
import Lister from "../../components/lister";
import Tile from "../../components/Tile";

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
                    items={courses}
                    Component={({title}) => <div className="error">{title}</div>}
                    actionDelete={(id) => console.log(id)}
                    linkSingle={`admin/courses`}
                    name={"No title given"}
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
