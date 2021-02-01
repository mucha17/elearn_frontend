import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";
import Tile from "../../components/Tile";
import Lister from "../../components/lister";
import database from "../../database";

class AdminModules extends React.Component {
    state = {
        modules: [],
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
        let {modules} = this.state;

        modules = await database.get("modules");

        this.setState({modules});
    }

    render() {
        let {modules, leftMenu} = this.state;

        if (modules.length === 0) {
            return <Layout
                header={{title: "Admin - moduły", description: "Strona admina do edycji i tworzenia modułów"}}
                title="Admin - moduły"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Tile title={"Akcje"}>
                    <NavLink to={'/admin/modules/new'}>
                        <input type={'button'} value={'Stwórz nowy'}/>
                    </NavLink>
                </Tile>
            </Layout>
        }
        return (
            <Layout
                header={{title: "Admin - moduły", description: "Strona admina do edycji i tworzenia modułów"}}
                title="Admin - moduły"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Tile title={"Akcje"}>
                    <NavLink to={'/admin/modules/new'}>
                        <input type={'button'} value={'Stwórz nowy'}/>
                    </NavLink>
                </Tile>
                <Lister
                    name={'Moduły'}
                    items={modules}
                    Component={({name}) => <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "100%"
                    }}>{name}</div>}
                    actionDelete={async (id) => database.remove('modules/delete/' + id)}
                    linkSingle={`admin/modules`}
                    filterKeys={{
                        skip: ["id", "to", "created_at", "updated_at", "url", "course_id"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminModules);
