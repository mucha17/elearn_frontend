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
        lessons: [],
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
        let {lessons} = this.state;

        lessons = await database.get("lessons/get");

        this.setState({lessons});
    }

    render() {
        const {leftMenu, lessons} = this.state;

        if (lessons.length === 0) {
            return (
                <Layout
                    header={{title: "Admin - lekcje", description: "Strona admina ze wszystkimi lekcjami"}}
                    title="Admin - lekcje"
                    smallTiles
                    leftMenu={leftMenu}
                    hideAll
                >
                    <Tile title={"Akcje"}>
                        <NavLink to={'/admin/lessons/new'}>
                            <input type={'button'} value={'Stwórz nową'}/>
                        </NavLink>
                    </Tile>
                    <Loader/>
                </Layout>
            )
        }
        return (
            <Layout
                header={{title: "Admin - lekcje", description: "Strona admina ze wszystkimi lekcje"}}
                title="Admin - lekcje"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Tile title={"Akcje"}>
                    <NavLink to={'/admin/lessons/new'}>
                        <input type={'button'} value={'Stwórz nową'}/>
                    </NavLink>
                </Tile>
                <Lister
                    name={'Lekcje'}
                    items={lessons}
                    Component={({name}) => <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "100%"
                        }}>{name}</div>}
                    actionDelete={async (id) => database.remove('lessons/delete/' + id)}
                    linkSingle={`admin/lessons`}
                    filterKeys={{
                        skip: ["id", "url", "content_type", "content_url", "module_id", "created_at", "updated_at"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminCourses);
