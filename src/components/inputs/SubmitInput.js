import React from "react"

const SubmitInput = ({ text, small }) => (
  <div className="submit-wrapper">
    <input
      type="submit"
      value={text}
      className={`right ${small ? "small" : "big"}`}
    />
  </div>
)

SubmitInput.defaultProps = {
  text: "No text given",
}

export default SubmitInput
