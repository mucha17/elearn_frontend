import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import database from "../database"
import functions from "../functions"
import SubmitInput from "./inputs/SubmitInput";

class ModuleForm extends React.Component {
    state = {
        courses: [],
        object: {}
    }

    async componentDidMount() {
        let {courses, object} = this.state;
        const {id} = this.props.match.params;

        courses = await database.get('courses');
        if (id !== "new") {
            object = await database.get('modules' + id);
        }

        this.setState({courses, object});
    }

    submitForm = async (event) => {
        event.preventDefault();
        const {object, form} = functions.createForm(event, {
            description: event.target[2].value,
            course_id: event.target[3].value,
        });

        let returne = false
        if (object.module_id) {
            returne = await database.post('modules/update/' + object.module_id, () => {
            }, form)
        } else {
            returne = await database.post('modules/create/', () => {
            }, form)
        }

        if (returne) {
            window.location.replace('/admin/modules')
        }
    };

    render() {
        const {courses, object} = this.state;
        const {id, name, description, course_id} = object;

        if (courses.length === 0) {
            return <div className={'link middle error'}>
                <NavLink to={'/admin/courses/new'}>
                    Dodaj najpierw kurs
                </NavLink>
            </div>;
        }

        return (
            <form onSubmit={(event) => this.submitForm(event)}>
                <input type="hidden" name={"module_id"} value={id}/>
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
                <div className={'input-wrapper'}>
                    <label htmlFor={"course_id"}>Kurs</label>
                    <select id={"course_id"}>
                        {courses.map((course) => (
                            <option
                                key={course.id}
                                value={course.id}
                                selected={course_id === course.id}
                            >
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
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

export default withRouter(ModuleForm);
