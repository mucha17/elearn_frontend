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
        leftMenu = await database.get("modules/" + module + "/lessons")
        const object = await database.get("modules/" + module + "/lessons/" + lesson)
        const cnt = await database.get("modules/" + module + "/lessons/" + lesson + "/contents")

        let newLessons = []
        Object.keys(leftMenu).map(x => {
            leftMenu[x].id = x;
            newLessons.push(leftMenu[x])
        })

        leftMenu = newLessons
        // leftMenu = lessons;

        const items = [];
        Object.keys(cnt).map(x => {
            cnt[x].id = x;
            items.push(cnt[x])
        })
        object.contents = items;

        for (let i in leftMenu) {
            leftMenu[i].to = `/courses/${name}/${module}/${leftMenu[i].id}`
            leftMenu[i].key = Math.random()
            leftMenu[i].condition = true
        }

        // console.log(leftMenu, object)

        this.setState({leftMenu, object});
    }

    renderFile = (type, url) => {
        if (!type) {
            return <div>Brak zawartości dodatkowej</div>
        }

        return (
            <React.Fragment>
                <h2 className={'lesson-title'}>
                    Zawartość dodatkowa
                </h2>
                {type === "DOCUMENT" && (
                    <embed src={url} width="100%" height="auto"/>
                )}
                {type === "PODCAST" && (
                    <audio src={url} width="100%" height="auto"/>
                )}
                {type === "VIDEO" && (
                    <iframe src={url} width="100%" height="auto"/>
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
                <div>
                    {object && object.contents && object.contents.map(content => {
                        return this.renderFile(content.type, content.url)
                    })}
                </div>
                {/*{this.renderFile(object.content_type, object.content_url)}*/}
            </Layout>
        );
    }
}

export default withRouter(Lesson);
