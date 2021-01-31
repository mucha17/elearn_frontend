import {addNotification} from "../redux/actions/notification"
import store from "../redux/store"
import * as CFG from "./config"

const update = async (url, action, form) => {
    url = CFG.BACKEND_URL + url
    store.dispatch(
        addNotification({status: "processing", title: "Updating..."}),
    )

    return await fetch(url, {method: "POST", body: form})
        .then(async (res) => {
            return {
                data: await res.json(),
                status: res.status,
            }
        })
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
