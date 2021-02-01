import {addNotification} from "../redux/actions/notification"
import store from "../redux/store"
import * as CFG from "./config"

import axios from "axios";

const update = async (url, action, form) => {
    url = CFG.BACKEND_URL + url
    store.dispatch(
        addNotification({status: "processing", title: "Updating..."}),
    )

    return axios.put(url, {form})
        .then((info) => {
            return CFG.handleStatus(info, action)
        })
        .catch((err) => {
            console.error(err)
            store.dispatch(
                addNotification({
                    status: "failure",
                    message: JSON.stringify(err, null, 2),
                }),
            )
            return false
        })
}

export default update
