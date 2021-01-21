import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";

class Course extends React.Component {
    state = {
        modules: []
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

        this.setState({modules});
    }

    render() {
        const {name} = this.props.match.params;
        const {modules} = this.state;

        if (modules.length === 0) {
            return <Layout header={{title: 'moduły'}}
                           title={"Moduły"}
                           smallTiles>
                <Loader/>
            </Layout>
        }
        return (
            <Layout header={{title: 'kurs ' + name, description: "Kurs " + name}} title={name} smallTiles
                    leftMenu={modules}>
                {modules.map(course => <ItemTile
                    title={modules.name}
                    description={modules.description}
                    url={"/courses/" + modules.url}
                    type={"module"}
                />)}
            </Layout>
        );
    }
}

export default withRouter(Course);
