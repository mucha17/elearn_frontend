import React from "react";
import {NavLink} from "react-router-dom";

class ModuleForm extends React.Component {
    state = {
        courses: []
    }

    async componentDidMount() {
        let {courses} = this.state;

        courses = await fetch('http://localhost:8080/api/courses')
            .then(res => res.json())
            .then(data => {
                return data || [];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });

        this.setState({courses});
    }


    submitForm = async (event) => {
        event.preventDefault();
        const object = {
            id: event.target[0].value,
            name: event.target[1].value,
            description: event.target[2].value,
            course_id: event.target[3].value,
        };

        console.log(object);
        await fetch('http://localhost:8080/api/modules', {method: 'POST', body: object})
            .then(res => res.json())
            .then(data => console.log(data))
            .catch((err) => console.log(err));
    };

    render() {
        const {id, title, description, course_id} = this.props;
        const {courses} = this.state;

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
                <label for={"name"}>Tytuł</label>
                <input id={"title"} type="text" name="title" value={title}/>
                <label htmlFor={"description"}>Opis</label>
                <textarea
                    id={"description"}
                    name={"description"}
                    onChange={(event) => autoResize(event)}
                >
				{description}
			</textarea>
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
                <input type={"submit"} value={"Dodaj"}/>
            </form>
        );
    }

};

const autoResize = (event) => {
    const target = event.currentTarget;
    let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
    target.style.height = height + "px";
};

export default ModuleForm;
