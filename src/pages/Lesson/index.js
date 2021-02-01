import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import database from "../../database"
import Lister from "../../components/lister";

class Lesson extends React.Component {
    state = {
        leftMenu: [],
        object: {}
    }

    async componentDidMount() {
        let {leftMenu} = this.state;

        const {name, module, lesson} = this.props.match.params;
        leftMenu = await database.get('lessons/get-by/' + module)
        const object = await database.get('lessons/get/' + lesson)

        for (let i in leftMenu) {
            leftMenu[i].to = `/courses/${name}/${module}/${leftMenu[i].id}`
            leftMenu[i].key = Math.random()
            leftMenu[i].condition = true
        }

        this.setState({leftMenu, object});
    }

    renderFile = (type, url) => {
        if (!type) {
            return <div>Brak zawartości ekstra</div>
        }

        return (
            <React.Fragment>
                <h2 className={'lesson-title'}>
                    Zawartość dodatkowa
                </h2>
                {type === "file" && (
                    <embed src={url} width="100%" height="auto"/>
                )}
                {type === "image" && (
                    <img src={url} width="100%" height="auto"/>
                )}
                {type === "video" && (
                    <video src={url} width="100%" height="auto"/>
                )}
            </React.Fragment>
        )
    }

    render() {
        const {name, module, lesson} = this.props.match.params;
        const {leftMenu, object} = this.state;

        return (
            <Layout
                header={{title: `Kurs ${name}, moduł ${module} - lekcja ${lesson}`, description: "Lekcja " + lesson}}
                title={`Kurs ${name}, moduł ${module} - lekcja ${lesson}`}
                smallTiles
                leftMenu={leftMenu}
            >
                <h2 className={'lesson-title'}>
                    {object.name}
                </h2>
                <p className={'lesson-description'}>
                    {object.description}
                </p>
                {this.renderFile(object.content_type, object.content_url)}
            </Layout>
        );
    }
}

export default withRouter(Lesson);
