import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const submitForm = (event) => {
    event.preventDefault();
    const object = {
        id: event.target[0].value,
        title: event.target[1].value,
        description: event.target[2].value,
        module_id: event.target[3].value,
        type: event.target[4].value,
        is_url: event.target[5].checked,
        content: event.target[6].name === "link" ? event.target[6].value : event.target[6].files[0]
    };

    //TODO: send
    console.log(object);
};

class LessonForm extends React.Component {
    state = {
        types: [
            {id: 1, name: "video"},
            {id: 2, name: "document"},
            {id: 3, name: "image"},
        ],
        selectedType: 'video',
        readUrl: false,
        modules: [],
    }
    setType = (type) => {
        this.setState({selectedType: type});
    }

    setUrl = (is_url) => {
        this.setState({readUrl: is_url});
    }

    async componentDidMount() {
        const {type, is_url} = this.props;
        this.setType(type);
        this.setUrl(is_url);
        let {modules} = this.state;

        modules = await fetch('http://localhost:8080/api/modules')
            .then(res => res.json())
            .then(data => {
                return data || [];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });

        this.setState({modules});
    }

    render() {
        const {
            id,
            title,
            description,
            type,
            is_url,
            content,
            module_id,
        } = this.props;
        const {types, selectedType, readUrl, modules} = this.state;


        if (modules.length === 0) {
            return <div className={'link middle error'}>
                <NavLink to={'/admin/modules/new'}>
                    Dodaj najpierw moduł
                </NavLink>
            </div>;
        }

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
                    onChange={(event) => this.setType(event.currentTarget.value)}
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
                        onChange={(event) => this.setUrl(event.currentTarget.checked)}
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
    }
}

const autoResize = (event) => {
    const target = event.currentTarget;
    let height = target.scrollHeight < 100 ? 100 : target.scrollHeight;
    target.style.height = height + "px";
};

export default LessonForm;
