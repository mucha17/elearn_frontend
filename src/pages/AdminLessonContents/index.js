import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader";
import Lister from "../../components/lister";
import Tile from "../../components/Tile";
import database from "../../database"

class AdminLessonContents extends React.Component {
    state = {
        contents: [],
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
        let {contents} = this.state;
        console.log(this.props);
        const {moduleId, id} = this.props.match.params;
        // const moduleId = "xd";
        // const id = "xd";

        contents = await database.get("modules/" + moduleId + "/lessons/" + id + "/contents");
        let newLessons = []
        Object.keys(contents).map(x => {
            contents[x].id = x;
            newLessons.push(contents[x])
        })

        contents = newLessons

        this.setState({contents});
        // this.setState({modules})
    }

    render() {
        const {leftMenu, contents} = this.state;
        const {moduleId, id} = this.props.match.params;
        // const moduleId = "xd";
        // const id = "xd";

        if (contents.length === 0) {
            return (
                <Layout
                    header={{title: "Admin - zawartość", description: "Strona admina ze wszystkimi lekcjami"}}
                    title="Admin - zawartość"
                    smallTiles
                    leftMenu={leftMenu}
                    hideAll
                >
                    <Tile title={"Akcje"}>
                        <NavLink to={`/admin/modules/${moduleId}/lessons/${id}/contents/new`}>
                            <input type={'button'} value={'Stwórz nową'}/>
                        </NavLink>
                    </Tile>
                    <div className={'error'}>Brak danych</div>
                    <Loader/>
                </Layout>
            )
        }
        return (
            <Layout
                header={{title: "Admin - zawartości", description: "Strona admina ze wszystkimi lekcje"}}
                title="Admin - zawartości"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Tile title={"Akcje"}>
                    <NavLink to={`/admin/modules/${moduleId}/lessons/${id}/contents/new`}>
                        <input type={'button'} value={'Dodaj'}/>
                    </NavLink>
                </Tile>
                <Lister
                    name={'Zawartość'}
                    items={contents}
                    Component={({type}) => <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "100%"
                        }}>{type}
                    </div>}
                    actionDelete={async (id) => database.remove('/modules/' + moduleId + '/lessons/' + id + '/contents')}
                    linkSingle={`admin/modules/${moduleId}/lessons/${id}/contents`}
                    filterKeys={{
                        skip: ["id", "url", "content_type", "content_url", "module_id", "created_at", "updated_at"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminLessonContents);
