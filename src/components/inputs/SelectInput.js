import React from "react"

class SelectInput extends React.Component {
  render() {
    const { name, title, selected, options, optionKeyName, small } = this.props
    const id = "text-select-" + name

    return (
      <div className={`input-outer-wrapper ${small ? "small" : "big"}`}>
        <div className="input-wrapper">
          <label htmlFor={id}>{title}</label>
          <select
            id={id}
            name={name}
            onChange={(event) => this.props.actionReturn(event.target)}
          >
            {options.map(singleOption => (
              <option key={singleOption.key} selected={selected === singleOption.key} value={singleOption.key}>
                {singleOption[optionKeyName]}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

SelectInput.defaultProps = {
  name: "unknown-name",
  selected: null,
  title: "No title given",
  options: [],
  optionKeyName: "key",
  actionReturn: () => console.log("No return function given"),
  small: false,
}

export default SelectInput
