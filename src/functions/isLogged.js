import roles from "../data/roleTypes.json"
import store from "../redux/store"

const isLogged = () => {
  let userId = store.getState().request?.data?.user?.id || 0
  let userRole = store.getState().request?.data?.user?.role || roles.USER

  return userId !== 0 && userRole !== roles.USER && userRole !== roles.NEW_USER
}

export default isLogged
