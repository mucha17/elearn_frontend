import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import database from "../database"
import functions from "../functions"
import SubmitInput from "./inputs/SubmitInput";

class LessonForm extends React.Component {
    state = {
        modules: [],
        object: {}
    }

    async componentDidMount() {
        let {modules, object} = this.state;
        const {moduleId, id} = this.props.match.params;

        modules = await database.get('modules');
        if (id !== "new") {
            object = await database.get('modules/' + moduleId + '/lessons/' + id);
        }
        object.id = id;
        object.module_id = moduleId;

        // console.log(id, object)

        this.setState({modules, object});
    }

    submitForm = async (event) => {
        event.preventDefault();
        const x = this.state.object;
        const {id, content} = x;
        const content_url = content;
        const {object, form} = functions.createForm(event, {
            description: event.target[1].value,
            // module_id: event.target[3].value,
            // content_type: 'file',
            // id,
            // content_url
        });


        const {moduleId} = this.props.match.params;
        const xxx = this.props.match.params.id
        console.log(object)

        let returne = false

        if (xxx !== "new") {
            returne = await database.update('modules/' + moduleId + '/lessons/' + xxx, () => {
            }, form)
        } else {
            returne = await database.post('modules/' + moduleId + '/lessons/', () => {
            }, form)
        }

        if (returne) {
            window.location.replace('/admin/lessons')
        }
    };

    render() {
        const {modules, object} = this.state;
        const {id, name, description, module_id} = object;

        if (modules.length === 0) {
            return <div className={'link middle error'}>
                <NavLink to={'/admin/modules/new'}>
                    Dodaj najpierw moduł
                </NavLink>
            </div>;
        }

        return (
            <form onSubmit={(event) => this.submitForm(event)}>
                {/*<input type="hidden" name={"module_id"} value={id}/>*/}
                <div className={'input-wrapper'}>
                    <label for={"name"}>Tytuł</label>
                    <input id={"title"} type="text" name="name" defaultValue={name}/>
                </div>
                <div className={'input-wrapper'}>
                    <label htmlFor={"description"}>Opis</label>
                    <textarea
                        id={"description"}
                        name={"description"}
                        onChange={(event) => autoResize(event)}
                        defaultValue={description}
                    >
			            </textarea>
                </div>
                {/*<div className={'input-wrapper'}>*/}
                {/*    {!name && <label htmlFor={"course_id"}>Moduł</label>*/}
                {/*    } {!name && <select id={"course_id"}>*/}
                {/*    {modules.map((module) => (*/}
                {/*        <option*/}
                {/*            key={module.id}*/}
                {/*            value={module.id}*/}
                {/*            selected={module_id === module.id}*/}
                {/*        >*/}
                {/*            {module.name}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
                {/*}             </div>*/}
                {/*<div className={'input-wrapper'}>*/}
                {/*    <label htmlFor={"fileUrl"}>{name ? 'Zmień plik' : 'Plik'}</label>*/}
                {/*    <input id={"fileUrl"} type="file" name="content"/>*/}
                {/*</div>*/}
                <SubmitInput text={name ? 'Aktualizuj' : 'Dodaj'}/>
            </form>
        );
    }

};

const autoResize = (event) => {
    const target = event.currentTarget;
    let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
    target.style.height = height + "px";
};

export default withRouter(LessonForm);
