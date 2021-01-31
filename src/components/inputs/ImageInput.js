import React from "react"
import functions from "../../functions"

class ImageInput extends React.Component {
  state = {
    imageString: "",
  }

  setImage = (data) => {
    const file = data.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({ imageString: reader.result })
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  render() {
    const { imageString } = this.state
    const { name, title, scale } = this.props

    return <div className='input-wrapper'>
      {imageString &&
      <div className='input-image-wrapper'>
        <img src={imageString} className='input-image' alt='input shower' />
      </div>
      }
      <label htmlFor={`input-image-${name}`} className='button'>
        {title} {`(${functions.getTranslation("in_scale_w_h")}: ${scale})`}
      </label>
      <input type='file' id={`input-image-${name}`} onChange={this.setImage} name={name} />
    </div>
  }
}

ImageInput.defaultProps = {
  name: "No name given",
  title: "No title given",
  returnData: () => {
    console.log("No return function given")
  },
  scale: 1,
}

export default ImageInput