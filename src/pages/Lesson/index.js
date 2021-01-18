import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";

class Lesson extends React.Component {
    render() {
        const {name, module, lesson} = this.props.match.params;
        const leftMenu = [
            {
                id: 0,
                name: "Lesson 1",
                to: "/courses/java/ee/0",
            },
        ];

        return (
            <Layout
                header={{
                    title: 'lekcja ' + lesson,
                    description: "Lekcja " + lesson + " z modułu " + module + " z kursu " + name
                }}
                title={`${name} - ${module} - ${lesson}`}
                smallTiles
                leftMenu={leftMenu}
            >
                Ls
            </Layout>
        );
    }
}

export default withRouter(Lesson);
