import React from "react";
import TextInput from "./inputs/TextInput";
import SubmitInput from "./inputs/SubmitInput";

const CourseForm = ({id, name, description}) => {
    return (
        <form onSubmit={(event) => (event)}>
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
