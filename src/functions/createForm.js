import functions from "./index"

const createForm = (event, additionalData) => {
    event.preventDefault()

    // Collect all fields
    const keys = Object.keys(event.target).filter(key => parseInt(key) == key)
    const fields = []
    for (let i = 0; i < keys.length; i++) {
        if (functions.isDataInput(event.target[keys[i]])) {
            fields.push(event.target[keys[i]])
        }
    }

    // Create object to return
    let object = {}
    for (const id in fields) {
        if (functions.isDataInput(fields[id])) {
            try {
                object[fields[id].name] = fields[id].files[0] || fields[id].value || fields[id].checked
            } catch {
                object[fields[id].name] = fields[id].value || fields[id].checked
            }
        }
    }
    object = {...object, ...additionalData}

    // Create form to be sent
    const form = new FormData()
    Object.keys(object).map(key => {
        if (object[key]) {
            form.append(key, object[key])
        }
    })

    return {object, form}
}

export default createForm