import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";

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
        ],
    }

    getCreatingItem = () => {
        return {
            id: 0,
            title: "Nowy",
            description: "Przejdź tutaj aby utworzyć nowy moduł dla kursu.",
            url: "/admin/modules/new",
        };
    }

    async componentDidMount() {
        let {modules} = this.state;

        modules = await fetch('http://localhost:8080/api/modules')
            .then(res => res.json())
            .then(data => {
                return data || [];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
        modules.unshift(this.getCreatingItem());

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
                {modules.map((module) => (
                    <ItemTile
                        key={module.id}
                        title={module.title}
                        description={module.description}
                        url={module.url}
                        type={module.id === 0 ? "default" : "edit"}
                    />
                ))}
            </Layout>
        );
    }
}

export default withRouter(AdminModules);
