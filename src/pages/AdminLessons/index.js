import React from "react";
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout";
import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader";
import Lister from "../../components/lister";
import Tile from "../../components/Tile";
import database from "../../database"

class AdminCourses extends React.Component {
    state = {
        wf: false,
        lessons: [],
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
        ]
    }

    selectChange = async (event) => {
        let {lessons} = this.state;
        const mid = event.currentTarget.value;

        // lessons = await database.get("lessons/get");
        lessons = await database.get("modules/" + mid + "/lessons");
        let newLessons = []
        this.setState({wf:false})
        Object.keys(lessons).map(x => {
            lessons[x].id = x;
            newLessons.push(lessons[x])
        })

        lessons = newLessons

        this.setState({lessons, wf: true, mid});
    }

    async componentDidMount() {
        let {modules, lessons} = this.state;

        modules = await database.get('modules')
        const mid = modules[0]?.id || 0;

        lessons = await database.get("modules/" + mid + "/lessons");
        let newLessons = []
        Object.keys(lessons).map(x => {
            lessons[x].id = x;
            newLessons.push(lessons[x])
        })

        lessons = newLessons

        this.setState({lessons, wf: true, mid});
        this.setState({modules})
    }

    render() {
        const {leftMenu, lessons, wf, modules, mid} = this.state;

        console.log(lessons)
        if (!wf) {
            return (
                <Layout
                    header={{title: "Admin - lekcje", description: "Strona admina ze wszystkimi lekcjami"}}
                    title="Admin - lekcje"
                    smallTiles
                    leftMenu={leftMenu}
                    hideAll
                >
                    <Tile title={'Wybierz moduł'}>
                        <div className={'input-wrapper'}>
                            <select onChange={this.selectChange}
                                    style={{width: '100%', margin: '0 auto'}}>
                                {modules.map(mod => <option value={mod.id}>{mod.name}</option>)}
                            </select>
                        </div>
                    </Tile>
                    <Loader/>
                </Layout>
            )
        }
        if (lessons.length === 0) {
            return (
                <Layout
                    header={{title: "Admin - lekcje", description: "Strona admina ze wszystkimi lekcjami"}}
                    title="Admin - lekcje"
                    smallTiles
                    leftMenu={leftMenu}
                    hideAll
                >
                    <Tile title={'Wybierz moduł'}>
                        <div className={'input-wrapper'}>
                            <select onChange={this.selectChange} style={{width: '100%', margin: '0 auto'}}>
                                {modules.map(mod => <option value={mod.id}>{mod.name}</option>)}
                            </select>
                        </div>
                    </Tile>
                    <Tile title={"Akcje"}>
                        <NavLink to={`/admin/lessons/${mid}/new`}>
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
                header={{title: "Admin - lekcje", description: "Strona admina ze wszystkimi lekcje"}}
                title="Admin - lekcje"
                smallTiles
                leftMenu={leftMenu}
                hideAll
            >
                <Tile title={'Wybierz moduł'}>
                    <div className={'input-wrapper'}>
                        <select onChange={this.selectChange} style={{width: '100%', margin: '0 auto'}}>
                            {modules.map(mod => <option value={mod.id}>{mod.name}</option>)}
                        </select>
                    </div>
                </Tile>
                <Tile title={"Akcje"}>
                    <NavLink to={`/admin/lessons/${mid}/new`}>
                        <input type={'button'} value={'Stwórz nową'}/>
                    </NavLink>
                </Tile>
                <Lister
                    name={'Lekcje'}
                    items={lessons}
                    Component={({name, id}) => <div key={mid+id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "100%"
                        }}>{name}
                        <NavLink to={'/admin/modules/' + mid + '/lesson/' + id + '/contents'}>
                            <input type={'button'} value={'Zarządzaj zawartością'}/>
                        </NavLink>
                    </div>}
                    actionDelete={async (id) => database.remove('modules/' + mid + '/lessons/' + id)}
                    linkSingle={`admin/lessons/${mid}`}
                    filterKeys={{
                        skip: ["id", "url", "content_type", "content_url", "module_id", "created_at", "updated_at"],
                        only: [],
                    }}
                />
            </Layout>
        );
    }
}

export default withRouter(AdminCourses);
