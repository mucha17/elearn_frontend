import React from "react";
import TextInput from "./inputs/TextInput";
import SubmitInput from "./inputs/SubmitInput";
import functions from "../functions"
import database from "../database"

const submitForm = async (event) => {
    const textArea = document.getElementsByTagName('textarea')[0].value;
    const {object, form} = functions.createForm(event, {description: textArea});

    let returnData = false;
    if (object.course_id) {
        returnData = await database.update(`courses/${object.course_id}`, () => {
        }, form)
    } else {
        returnData = await database.post('courses/', () => {
        }, form)
    }

    if (returnData) {
        console.log("Success")
    } else {
        console.log("Failure")
    }
}

const CourseForm = ({id, name, description}) => {
    return (
        <form onSubmit={(event) => submitForm(event)}>
            <input type="hidden" name={"course_id"} value={id}/>
            <TextInput
                title={'Tytuł'}
                name={'name'}
                value={name}
            />
            <div className={'input-wrapper'}>
                <label htmlFor={"description"}>Opis</label>
                <textarea
                    id={"description"}
                    name={"description"}
                    onChange={(event) => autoResize(event)}
                >
				{description}
			    </textarea>
            </div>
            <SubmitInput text={'Dodaj'}/>
        </form>
    );
};

const autoResize = (event) => {
    const target = event.currentTarget;
    let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
    target.style.height = height + "px";
};

export default CourseForm;
