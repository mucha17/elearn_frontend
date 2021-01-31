import React from "react"

class CheckboxInput extends React.Component {
  render() {
    const { name, checked, title } = this.props
    const id = "checkbox-input-" + name

    return (
      <div className="checkbox-wrapper">
        <label className="checkbox" htmlFor={id}>
          <input type="checkbox" name={name} defaultChecked={checked} id={id} />
          {title}
        </label>
      </div>
    )
  }
}

CheckboxInput.defaultProps = {
  name: "unknown-name",
  checked: false,
  title: "No title given",
  returnData: () => {
    console.log("No return function given")
  },
}

export default CheckboxInput
