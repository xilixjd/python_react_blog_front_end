/**
 * Created by xilixjd on 17/3/9.
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { LOGGING_SHOW, REG_SHOW, MODAL_CLOSE, LOGIN_SUBMIT, REG_SUBMIT} from '../constants/ActionTypes.js'
import { logModalShow, fetchIssues } from '../actions/index.js'

import { Icon, Popover } from 'antd'

import '../../css/loginingview.scss'


class LoginingView extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssues('checkUser'))
    }

    render() {
        let { dispatch } = this.props
        let loggedIn = this.props.loggedIn
        let info = this.props.info
        let uncheckedMessage = info.messages
        let messageLength, content, contentWrap
        try {
            messageLength = uncheckedMessage.length
        } catch(e) {
            messageLength = ''
        }
        if (uncheckedMessage) {
            content = uncheckedMessage.map((item, index) =>
                <p key={index}><a href="JavaScript:void(0)">@{item.sender}</a>: {item.content}</p>
            )
            contentWrap = (
                <div>
                    { content }
                </div>
            )
        }

        let loginIcon = <div className="fixed-logreg-icon"
                             onClick={ (e) => {dispatch(logModalShow(LOGGING_SHOW))} }
                             ><Icon type="login" /><span>登录</span></div>
        let registerIcon = <div className="fixed-logreg-icon"
                                onClick={ (e) => {dispatch(logModalShow(REG_SHOW))} }
                                ><Icon type="user-add" /><span>注册</span></div>
        let logoutIcon = <div className="fixed-logreg-icon"
                                onClick={ (e) => {dispatch(fetchIssues('logOut'))} }
                                ><Icon type="logout" /><span>登出</span></div>
        let logoutBox = <div className="fixed-logreg-box">
                            <Popover content={contentWrap} title="New Message" trigger="click">
                                <div className="fixed-logreg-icon"><Icon type="user" />
                                    <span>{info.username + `(${messageLength})`}</span>
                                </div>
                            </Popover>
                            {logoutIcon}
                        </div>
        let logRegBox = <div className="fixed-logreg-box">{loginIcon}{registerIcon}</div>
        return (
            <div className="fixed-log-div" >
                {loggedIn ? logoutBox : logRegBox}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state
    const {
        loggedIn,
        info
    } = isLoggedIn || {
        loggedIn: false,
        info: {}
    }

    return {
        loggedIn,
        info
    }
}

export default connect(mapStateToProps)(LoginingView)