import React, {useState} from "react";

const submitForm = (event) => {
    event.preventDefault();
    const object = {
        id: event.target[0].value,
        title: event.target[1].value,
        description: event.target[2].value,
        course_id: event.target[3].value,
        module_id: event.target[4].value,
        type: event.target[5].value,
        is_url: event.target[6].checked,
        content: event.target[7].name === "link" ? event.target[7].value : event.target[7].files[0]
    };

    //TODO: send
    console.log(object);
};

const LessonForm = ({
                        id,
                        title,
                        description,
                        type,
                        is_url,
                        content,
                        course_id,
                        module_id,
                    }) => {
    const courses = [
        {id: 1, title: "Title1"},
        {id: 2, title: "Title2"},
        {id: 3, title: "Title3"},
    ];
    const modules = [
        {id: 1, title: "Module1"},
        {id: 2, title: "Module2"},
        {id: 3, title: "Module3"},
    ];
    const types = [
        {id: 1, name: "video"},
        {id: 2, name: "document"},
        {id: 3, name: "image"},
    ];
    const [selectedType, setType] = useState(type);
    const [readUrl, setUrl] = useState(is_url);

    return (
        <form onSubmit={(event) => submitForm(event)}>
            <input type="hidden" name={"module_id"} value={id}/>
            <label htmlFor={"title"}>Tytuł</label>
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
                        key={`course-${course.id}`}
                        value={course.id}
                        selected={course_id === course.id}
                    >
                        {course.title}
                    </option>
                ))}
            </select>
            <label htmlFor={"module_id"}>Moduł</label>
            <select id={"module_id"}>
                {modules.map((module) => (
                    <option
                        key={`module-${module.id}`}
                        value={module.id}
                        selected={module_id === module.id}
                    >
                        {module.title}
                    </option>
                ))}
            </select>
            <label htmlFor={"type"}>Rodzaj lekcji</label>
            <select
                id={"type"}
                onChange={(event) => setType(event.currentTarget.value)}
            >
                {types.map((lesson_type) => (
                    <option
                        key={`type-${lesson_type.id}`}
                        value={lesson_type.name}
                        selected={type === lesson_type.name}
                    >
                        {lesson_type.name}
                    </option>
                ))}
            </select>
            <label htmlFor={"content_type"}>Załącznik</label>
            <div className={"checkbox-wrapper"}>
                <input
                    type={"checkbox"}
                    defaultChecked={is_url}
                    id={"content_type"}
                    onChange={(event) => setUrl(event.currentTarget.checked)}
                />
                <label htmlFor={"content_type"} className={"invisible-label"}>
                    <div className={"checkbox-visual"}>
                        <div className={"option true"}>Link</div>
                        <div className={"checkbox-dot"}/>
                        <div className={"option false"}>Plik</div>
                    </div>
                </label>
            </div>
            <label htmlFor={'content'}>
                Dodaj {readUrl ? "link do " : "plik jako "} {selectedType}
            </label>
            {readUrl ?
                <input type={'text'} name={'link'} id={'content'} value={content}/>
                :
                <input type={'file'} name={'file'} id={'content'}/>
            }
            <input type={"submit"} value={"Dodaj"}/>
        </form>
    );
};

const autoResize = (event) => {
    const target = event.currentTarget;
    let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
    target.style.height = height + "px";
};

export default LessonForm;
