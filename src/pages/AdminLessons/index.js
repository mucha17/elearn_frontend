import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";
import database from "../../database";
import Tile from "../../components/Tile";
import Lister from "../../components/lister";

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
        let {lessons, leftMenu} = this.state;

        lessons = await database.get("lessons");
        leftMenu = lessons;

        for (let menuItem in leftMenu) {
            leftMenu[menuItem].url = "/admin/lessons/" + leftMenu[menuItem].id;
        }

        this.setState({lessons, leftMenu});
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
                <Lister
                    name={'Lekcje'}
                    items={lessons}
                    Component={({name}) => <div className="error">{name}</div>}
                    actionDelete={(id) => console.log(id)}
                    linkSingle={`admin/lessons`}
                    filterKeys={{
                        skip: ["id"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminLessons);
