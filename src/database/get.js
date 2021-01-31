import { addNotification } from "../redux/actions/notification"
import store from "../redux/store"
import * as CFG from "./config"

const get = async (url, silent = false) => {
  url = CFG.BACKEND_URL + url + CFG.getParams()

  if (!silent) {
    store.dispatch(
      addNotification({ status: "processing", title: "Fetching data" }),
    )
  }

  CFG.updateRequestTime()

  return await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!silent) {
        store.dispatch(addNotification({ status: "success" }))
      }
      CFG.setParams(data)
      return data.data
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
