import React from "react";

const submitForm = async (event) => {
    event.preventDefault();
    const object = {
        id: event.target[0].value,
        name: event.target[1].value,
        description: event.target[2].value,
    };

    console.log(object);
    if (object.id === "") {
        await fetch('http://localhost:8080/api/courses', {method: 'POST', body: {...object}})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location("/admin/courses");
            })
            .catch((err) => console.log(err));
    } else {
        await fetch('http://localhost:8080/api/courses', {method: 'PUT', body: {...object}})
            .then(res => res.json())
            .then(data => console.log(data))
            .catch((err) => console.log(err));
    }
};

const CourseForm = ({id, title, description}) => {
    return (
        <form onSubmit={(event) => submitForm(event)}>
            <input type="hidden" name={"course_id"} value={id}/>
            <label for={"title"}>Tytuł</label>
            <input id={"title"} type="text" name="title" value={title}/>
            <label htmlFor={"description"}>Opis</label>
            <textarea
                id={"description"}
                name={"description"}
                onChange={(event) => autoResize(event)}
            >
				{description}
			</textarea>
            <input type={"submit"} value={"Dodaj"}/>
        </form>
    );
};

const autoResize = (event) => {
    const target = event.currentTarget;
    let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
    target.style.height = height + "px";
};

export default CourseForm;
