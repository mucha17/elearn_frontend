import {addNotification} from "../redux/actions/notification"
import store from "../redux/store"
import * as CFG from "./config"

import axios from "axios";

const get = async (url, silent = false) => {
    url = CFG.BACKEND_URL + url

    if (!silent) {
        store.dispatch(
            addNotification({status: "processing", title: "Fetching data"}),
        )
    }

    return await axios.get(url)
        .then((data) => {
            console.log(data);

            if (!silent) {
                store.dispatch(addNotification({status: "success"}))
            }
            return data.data || []
        })
        .catch((err) => {
            console.error(err)
            if (!silent) {
                store.dispatch(
                    addNotification({
                        status: "failure",
                        message: JSON.stringify(err, null, 2),
                    }),
                )
            }
            return false
        })
}

export default get
