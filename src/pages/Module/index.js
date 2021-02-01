import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import database from "../../database"
import Lister from "../../components/lister";

class Module extends React.Component {
    state = {
        lessons: [],
        leftMenu: []
    }

    async componentDidMount() {
        let {lessons, leftMenu} = this.state;

        const {name, module} = this.props.match.params;
        lessons = await database.get('courses/' + name + "/modules/" + module + "/lessons")
        leftMenu = lessons;

        for (let i in leftMenu) {
            leftMenu[i].to = `/courses/${name}/${module}/${leftMenu[i].id}`
            leftMenu[i].key = Math.random()
            leftMenu[i].condition = true
        }

        this.setState({lessons, leftMenu});
    }

    render() {
        const {name, module} = this.props.match.params;
        const {lessons, leftMenu} = this.state;

        if (lessons.length === 0) {
            return <Layout header={{title: `Kurs ${name}, moduł ${module} - lekcje`}}
                           title={`Kurs ${name}, moduł ${module} - lekcje`}
                           leftMenu={leftMenu}
                           smallTiles>
                Brak lekcji
            </Layout>
        }
        return (
            <Layout
                header={{title: `Kurs ${name}, moduł ${module} - lekcje`, description: "Lekcje " + module}}
                title={`Kurs ${name}, moduł ${module} - lekcje`}
                smallTiles
                leftMenu={leftMenu}
            >
                <Lister
                    name={'Moduły'}
                    items={lessons}
                    Component={({name}) => <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "100%"
                    }}>x{name}</div>}
                    noDelete
                    linkSingle={`courses/${name}/${module}`}
                    filterKeys={{
                        skip: ["id", "created_at", "updated_at", "url", "course_id", "to"],
                        only: ['name', 'description'],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(Module);
