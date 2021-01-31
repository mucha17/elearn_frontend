import { addNotification } from "../redux/actions/notification"
import store from "../redux/store"
import * as CFG from "./config"

const remove = async (url, action) => {
  // FIXME: more-action notification
  if (!window.confirm("Are you sure?")) {
    return
  }

  url = CFG.BACKEND_URL + url + CFG.getParams()

  store.dispatch(
    addNotification({ status: "processing", title: "Deleting..." }),
  )

  CFG.updateRequestTime()

  return await fetch(url, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      store.dispatch(addNotification({ status: "success" }))
      store.dispatch(action)
      CFG.setParams(data)
    })
    .catch((err) => {
      console.error(err)
      store.dispatch(
        addNotification({
          status: "failure",
          message: JSON.stringify(err, null, 2),
        }),
      )
    })
}

export default remove
