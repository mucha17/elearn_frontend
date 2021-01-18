import React from "react";

const submitForm = (event) => {
	event.preventDefault();
	const object = {
		course_id: event.target[0].value,
		title: event.target[1].value,
		description: event.target[2].value,
	};

	//TODO: send
	console.log(object);
};

const CourseForm = ({ id, title, description }) => {
	return (
		<form onSubmit={(event) => submitForm(event)}>
			<input type="hidden" name={"course_id"} value={id} />
			<label for={"title"}>Tytuł</label>
			<input id={"title"} type="text" name="title" value={title} />
			<label htmlFor={"description"}>Opis</label>
			<textarea
				id={"description"}
				name={"description"}
				onChange={(event) => autoResize(event)}
			>
				{description}
			</textarea>
			<input type={"submit"} value={"Dodaj"} />
		</form>
	);
};

const autoResize = (event) => {
	const target = event.currentTarget;
	let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
	target.style.height = height + "px";
};

export default CourseForm;
