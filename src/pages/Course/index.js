import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";
import database from "../../database"
import Tile from "../../components/Tile";
import Lister from "../../components/lister";
import MenuLeftItem from "../../components/MenuLeftItem";

class Course extends React.Component {
    state = {
        modules: [],
        leftMenu: []
    }

    async componentDidMount() {
        let {modules, leftMenu} = this.state;

        const {name} = this.props.match.params;
        modules = await database.get('courses/' + name + "/modules")
        leftMenu = modules;

        for (let i in leftMenu) {
            leftMenu[i].to = `/courses/${name}/${leftMenu[i].module.id}`
            // leftMenu[i].key = Math.random()
            leftMenu[i].condition = true
            leftMenu[i].id = leftMenu[i].module.id
            leftMenu[i].name = leftMenu[i].module.name
        }

        this.setState({modules, leftMenu});
    }

    render() {
        const {name} = this.props.match.params;
        const {modules, leftMenu} = this.state;

        console.log(modules)

        if (modules.length === 0) {
            return <Layout header={{title: 'moduły'}}
                           title={"Moduły"}
                           leftMenu={leftMenu}
                           smallTiles>
                Brak modułów
            </Layout>
        }
        return (
            <Layout
                header={{title: 'Moduły kursu ' + name, description: "Kurs " + name}}
                title={`Moduły kursu ${name}`}
                smallTiles
                leftMenu={leftMenu}
            >
                <Lister
                    name={'Moduły'}
                    items={modules}
                    Component={({module}) => <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "100%"
                    }}>{module.name}</div>}
                    noDelete
                    linkSingle={`courses/${name}`}
                    filterKeys={{
                        skip: ["id", "created_at", "updated_at", "url", "course_id", "to"],
                        only: ['name', 'description'],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(Course);
