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
        leftMenu: [],
    }

    async componentDidMount() {
        let {modules, leftMenu} = this.state;

        modules = await database.get("modules");
        leftMenu = modules;

        for (let menuItem in leftMenu) {
            leftMenu[menuItem].url = "/admin/modules/" + leftMenu[menuItem].id;
        }

        this.setState({modules, leftMenu});
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
                <Loader/>
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
                    Component={({name}) => <div className="error">{name}</div>}
                    actionDelete={(id) => console.log(id)}
                    linkSingle={`admin/modules`}
                    filterKeys={{
                        skip: ["id"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminModules);
