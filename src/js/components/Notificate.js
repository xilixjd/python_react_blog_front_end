import React, {Component} from 'react'
import { connect } from 'react-redux'

import { commitStatus } from '../actions/index.js'

import { notification } from 'antd'

class Notificate extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.infoMessage !== nextProps.infoMessage) {
            let infoMessage = nextProps.infoMessage
            this.checkInfoMessage(infoMessage.status, infoMessage.message, infoMessage.description)
        }
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        })
    }

    checkInfoMessage = (status, message, description) => {
        if (status === true) {
            this.openNotificationWithIcon('success', message, description)
        } else if (status === false) {
            this.openNotificationWithIcon('error', message, description)
        }
        const { dispatch } = this.props
        dispatch(commitStatus('default', '', ''))
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { infoMessage } = state
    return {
        infoMessage
    }
}

export default connect(mapStateToProps)(Notificate)