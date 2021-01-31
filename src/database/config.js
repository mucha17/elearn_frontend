import store from "../redux/store"
import {addNotification} from "../redux/actions/notification"

export const BACKEND_URL = "http://localhost:8000/api/admin/"

/**
 * Response status handler
 */
export const handleStatus = ({data, status}, action) => {
    switch (status) {
        case 200:
        case 201:
            store.dispatch(addNotification({status: "success"}))
            // if (action) {
            //     store.dispatch(action)
            // }
            return true
        case 403:
            store.dispatch(addNotification({status: "unknown", message: "AUTHORIZATION FAILURE " + status}))
            return false
        case 400:
        case 404:
        case 500:
            store.dispatch(
                addNotification({
                    status: "failure",
                    message: JSON.stringify(data.data, null, 2),
                }),
            )
            return false
        default:
            store.dispatch(addNotification({status: "unknown", message: "Handle this in config.js " + status}))
            return false
    }
}