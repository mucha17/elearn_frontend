import * as CFG from "./config"
import store from "../redux/store"
import { addNotification } from "../redux/actions/notification"

const doLogout = async () => {
  const url = CFG.BACKEND_URL + "me/logout?" + CFG.getToken()

  CFG.clearUser()

  store.dispatch(
    addNotification({
      status: "processing",
      title: "Logging out",
      message: null,
    }),
  )

  await fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then(() => {
      store.dispatch(
        addNotification({
          status: "success",
          title: "Logged out",
          message: null,
        }),
      )

      CFG.clearUser()
    })
    .catch((error) => {
      console.error(error)
      store.dispatch(
        addNotification({
          status: "failure",
          title: "Failed to logout",
          message: null,
        }),
      )

      CFG.clearUser()
    })
}

export default doLogout
