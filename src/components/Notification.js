import React from "react"
import {connect} from "react-redux"
import {removeNotification} from "../redux/actions/notification"

class Notification extends React.Component {
    state = {
        counter: 500,
        step: 10,
        countDown: true,
        status: {
            name: "unknown",
            translation: "unknown",
            button: "",
            autoClose: false,
        },
    }

    setCountDown = (countDown) => {
        this.setState({countDown})
    }

    close = () => {
        const {id} = this.props
        this.setState({counter: 50})

        setTimeout(() => {
            this.props.dispatch(removeNotification(id))
        }, 250)
    }

    componentDidMount() {
        let {status} = this.props
        status = getNotificationStatus(status)
        this.setState({status})

        const {autoClose} = status
        const {step} = this.state

        if (autoClose) {
            let timeCounter = setInterval(() => {
                let {step, counter, countDown} = this.state
                if (countDown) {
                    counter -= step
                    this.setState({counter})
                }

                if (counter === 0) {
                    clearInterval(timeCounter)
                    this.close()
                }
            }, step)
        }
    }

    render() {
        let {title, message} = this.props
        let {status, counter} = this.state
        const buttonClass = "button absolute right " + status.button

        // console.log(status, statuses)

        if (status.name !== statuses[0].name) {
            return <React.Fragment/>
        }

        return (
            <div
                className={`notification ${status.name} ${
                    counter < 51 ? "closing" : "open"
                }`}
                onMouseEnter={() => this.setCountDown(false)}
                onMouseLeave={() => this.setCountDown(true)}
            >
                <button className={buttonClass} onClick={() => this.close()}>
                    X
                </button>
                <h3 className="notification-title no-border">
                    {title || status.name}
                </h3>
                {message?.length > 0 && (
                    <div className="notification-message">{message}</div>
                )}
            </div>
        )
    }
}

const statuses = [
    {
        name: "processing",
        button: "",
        autoClose: true,
    },
    {
        name: "more-action",
        button: "",
        autoClose: false,
    },
    {
        name: "success",
        button: "accept",
        autoClose: true,
    },
    {
        name: "failure",
        button: "warn",
        autoClose: false,
    },
    {
        name: "unknown",
        button: "",
        autoClose: false,
    },
]

const getNotificationStatus = (status) => {
    return statuses.filter(item => item.name === status)[0] || statuses[statuses.length - 1]
}

Notification.defaultProps = {
    status: "unknown",
    message: "",
    id: -1,
    autoClose: false,
}

export default connect()(Notification)
