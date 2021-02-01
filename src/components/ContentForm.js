import React from "react";
import TextInput from "./inputs/TextInput";
import SubmitInput from "./inputs/SubmitInput";
import database from "../database"
import {Router, withRouter} from "react-router";
import {BrowserRouter} from "react-router-dom";

class ContentForm extends React.Component {
    submitForm = async (event) => {
        event.preventDefault();
        const type = event.target[0].value;
        const url = event.target[1].value;
        const form = new FormData();
        form.append('type', type)
        form.append('url', url)

        // const {moduleId, id, cid} = this.props.match.params
        const roasfa = window.location.pathname.split("/")
        let moduleId = '';
        let id = '';
        let cid = '';

        for (let i = 0; i < roasfa.length; i++) {
            // console.log(roasfa[i], roasfa[i + 1])

            if (roasfa[i] === "modules") {
                moduleId = roasfa[i + 1]
            } else if (roasfa[i] === "lessons") {
                id = roasfa[i + 1]
            } else if (roasfa[i] === "contents") {
                cid = roasfa[i + 1]
            }
        }

        let returnData = false;

        if (cid !== "new") {
            returnData = await database.update(`modules/${moduleId}/lessons/${id}/contents/${cid}`, () => {
            }, form)
        } else {
            // console.log('in', type, url)
            returnData = await database.post(`modules/${moduleId}/lessons/${id}/contents`, () => {
            }, form)
        }
        // console.log(returnData, moduleId, id, cid, type, url)
        if (returnData) {
            window.history.back();
        }
    }

    render() {
        const
            {
                type, url
            }
                = this.props

        return (
            <form onSubmit={(event) => this.submitForm(event)}>
                <div className={'input-wrapper'}>
                    <select>
                        <option selected={type === "VIDEO"} value={'VIDEO'}>film</option>
                        <option selected={type === "PODCAST"} value={'PODCAST'}>podcast</option>
                        <option selected={type === "DOCUMENT"} value={'DOCUMENT'}>dokument</option>
                    </select>
                </div>
                <TextInput name={'url'} title={'Link do materiału'} value={url}/>
                <SubmitInput text={type ? 'Aktualizuj' : 'Dodaj'}/>
            </form>
        );
    }
}

export default ContentForm
// export default withRouter(ContentForm);
