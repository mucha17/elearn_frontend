import store from "../redux/store"
import { setCsrf, setToken, setUser } from "../redux/actions/request"
import roles from "../data/roleTypes.json"
import { addNotification } from "../redux/actions/notification"

export const USER_TOKEN_REFRESH_TIME = 30000
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const LAST_REQUEST_TIME = "last_request_time"
const TOKEN = "_token"

/**
 * Check if user is logged and if he was last authed more than 30sec ago
 */
export const canAuthUser = () => {
  const time = new Date()
  const now = time.getTime().toString()
  const request = localStorage.getItem(LAST_REQUEST_TIME) || (parseInt(now) - 2 * USER_TOKEN_REFRESH_TIME).toString()
  const userExists = store.getState().request?.user?.id !== 0

  return userExists && now - request > USER_TOKEN_REFRESH_TIME
}

/**
 * Return current user token
 */
export const getToken = () => {
  const token =
    localStorage.getItem(TOKEN) ||
    store.getState().request.data?.token ||
    false

  if (!token) {
    return false
  }

  return "_token=" + token
}

/**
 * Definite user logout
 */
export const clearUser = () => {
  const object = {
    id: 0,
    name: "No name",
    role: roles.USER,
    session: null,
  }

  localStorage.setItem(TOKEN, null)
  store.dispatch(setToken(null))
  store.dispatch(setCsrf(null))
  store.dispatch(setUser({ ...object }))
}

/**
 * Updates last request time
 */
export const updateRequestTime = () => {
  const time = new Date()
  const now = time.getTime().toString()
  localStorage.setItem(LAST_REQUEST_TIME, now)
}

/**
 * Set session params
 */
export const setParams = (data = null) => {
  localStorage.setItem(TOKEN, data?._token || null)
  store.dispatch(setToken(data?._token || null))
  store.dispatch(setCsrf(data?.csrf || null))
}

/**
 * All session params
 */
export const getParams = () => {
  return "?" + (getToken() || "")
}

/**
 * Response status handler
 */
export const handleStatus = ({ data, status }, action) => {
  switch (status) {
    case 200:
    case 201:
      store.dispatch(addNotification({ status: "success" }))
      if (action) {
        store.dispatch(action)
      }
      setParams(data)
      return true
    case 403:
      store.dispatch(addNotification({ status: "unknown", message: "AUTHORIZATION FAILURE " + status }))
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
      store.dispatch(addNotification({ status: "unknown", message: "Handle this in config.js " + status }))
      return false
  }
}