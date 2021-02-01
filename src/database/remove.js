import {addNotification} from "../redux/actions/notification"
import store from "../redux/store"
import * as CFG from "./config"
import axios from "axios";

const remove = async (url, action) => {
    // FIXME: more-action notification
    if (!window.confirm("Are you sure?")) {
        return
    }

    url = CFG.BACKEND_URL + url

    store.dispatch(
        addNotification({status: "processing", title: "Deleting..."}),
    )

    if (await axios.delete(url)) {
        store.dispatch(addNotification({status: "success"}))
        window.location.refresh();
    } else {
        store.dispatch(
            addNotification({
                status: "failure",
            }),
        )
    }

}

export default remove
