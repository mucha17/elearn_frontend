const statuses = [
  {
    name: "processing",
    translation: "processing",
    button: "",
    autoClose: true,
  },
  {
    name: "more-action",
    translation: "more_action_needed",
    button: "",
    autoClose: false,
  },
  {
    name: "success",
    translation: "success",
    button: "accept",
    autoClose: true,
  },
  {
    name: "failure",
    translation: "failure",
    button: "warn",
    autoClose: false,
  },
  {
    name: "unknown",
    translation: "unknown",
    button: "",
    autoClose: false,
  },
]

const getNotificationStatus = (status) => {
  return statuses.filter(item => item.name === status)[0] || statuses[statuses.length - 1]
}

export default getNotificationStatus