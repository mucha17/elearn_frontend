const isDataInput = (input) => {
  return input.tagName === "INPUT" && input.type !== "submit" || false
}

export default isDataInput