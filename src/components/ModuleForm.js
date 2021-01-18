import React from "react";

const submitForm = (event) => {
	event.preventDefault();
	const object = {
		id: event.target[0].value,
		title: event.target[1].value,
		description: event.target[2].value,
		course_id: event.target[3].value,
	};

	//TODO: send
	console.log(object);
};

const ModuleForm = ({ id, title, description, course_id }) => {
	const courses = [
		{ id: 1, title: "Title1" },
		{ id: 2, title: "Title2" },
		{ id: 3, title: "Title3" },
	];

	return (
		<form onSubmit={(event) => submitForm(event)}>
			<input type="hidden" name={"module_id"} value={id} />
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
			<label htmlFor={"course_id"}>Kurs</label>
			<select id={"course_id"}>
				{courses.map((course) => (
					<option
						key={course.id}
						value={course.id}
						selected={course_id === course.id}
					>
						{course.title}
					</option>
				))}
			</select>
			<input type={"submit"} value={"Dodaj"} />
		</form>
	);
};

const autoResize = (event) => {
	const target = event.currentTarget;
	let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
	target.style.height = height + "px";
};

export default ModuleForm;
