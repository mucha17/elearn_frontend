import {createStore, combineReducers} from "redux"

import notifications from "./stores/notifications"

const store = createStore(
    combineReducers({
        notifications
    })
)

export default store
