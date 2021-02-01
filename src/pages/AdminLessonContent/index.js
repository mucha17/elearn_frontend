import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import database from "../../database";
import ContentForm from "../../components/ContentForm";

class AdminLessonContent extends React.Component {
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
        object: {}
    }

    async componentDidMount() {
        const {moduleId, id, cid} = this.props.match.params;
        let {object} = this.state;
        const is_new = cid === "new";

        if (!is_new) {
            object = await database.get('modules/' + moduleId + '/lessons/' + id + "/contents");
        }

        let xd = []
        Object.keys(object).map((key) => {
            object[key].id = key;
            xd.push(object[key])
        })

        object = xd[0]

        // console.log(object)

        this.setState({object})
    }

    render() {
        const {leftMenu, object} = this.state;
        const {id} = this.props.match.params;
        const is_new = id === "new";
        const title = "Admin " + (is_new ? "nowy plik" : "edytuj plik " + id);
        // let object;

        return (
            <Layout
                header={{title, description: "Strona admina do edycji i tworzenia plikow"}}
                title={title} smallTiles leftMenu={leftMenu} hideAll>
                {is_new ? <ContentForm/> : <ContentForm {...object} />}
            </Layout>
        );
    }
}

export default withRouter(AdminLessonContent);
