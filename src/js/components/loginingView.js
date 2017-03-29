/**
 * Created by xilixjd on 17/3/9.
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { LOGGING_SHOW, REG_SHOW, MODAL_CLOSE, LOGIN_SUBMIT, REG_SUBMIT} from '../constants/ActionTypes.js'
import { logModalShow, fetchIssues } from '../actions/index.js'

import { Icon, Popover } from 'antd'

import '../../css/loginingview.scss'
import '../../css/antd.scss'


class LoginingView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            scrollToBottom: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssues('checkUser'))
        window.addEventListener('scroll', this.scrollToBottom.bind(this))
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    componentWillUnmount() {
    }

    scrollToBottom = () => {
        const scrollHeight = document.documentElement.scrollHeight
        const eleScroll = document.body.scrollTop + document.documentElement.clientHeight
        console.log('scrollheight', scrollHeight)
        console.log('eleScroll', eleScroll)
        if (scrollHeight <= 1000) {
            this.setState({
                scrollToBottom: false
            })
        }
        if (scrollHeight - eleScroll <= 150) {
            this.setState({
                scrollToBottom: true
            })
        } else {
            this.setState({
                scrollToBottom: false
            })
        }
    }

    checkMessages = () => {
        const { dispatch } = this.props
        dispatch(fetchIssues('checkMessages'))
        this.setState({
            checked: true
        })
    }

    // 根据中英文不同判断其字符长度，使其长度更合理
    strLength = (str) => {
        var len = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++;
            }
            else {
                len+=2;
            }
        }
        return len;
    }

    timeFromNowLittleThan2Hour = (time) => {
        const now = new Date().getTime()
        const timeDifference = now - parseInt(time)
        return timeDifference <= 60 * 1000 * 60
    }

    render() {
        let { dispatch } = this.props
        let loggedIn = this.props.loggedIn
        let info = this.props.info
        let messages = this.props.messages
        let messageLength, content, contentWrap
        let checked = this.state.checked
        try {
            messageLength = info.uncheckedMessagesLen
        } catch(e) {
            messageLength = 0
        }
        if (messages) {
            const regStr = /(@.*?)\s/g
            content = messages.map((item, index) =>{
                if (index > 4) {
                    return
                }
                let itemContent = item.content.replace(regStr, '')
                return (
                    <p key={index}
                       className={(item.checked == '0' || this.timeFromNowLittleThan2Hour(item.time)) ? 'unchecked' : ''}>
                        <a href="JavaScript:void(0)">@{item.sender}</a>
                        <span>: <a href={'/#' + item.href}>{this.strLength(itemContent) > 16 ?
                            itemContent.substring(0, 8) + '..' : itemContent}</a></span>
                    </p>
                )
            })
            contentWrap = (
                <div className="loginingView-div">
                    { content }
                    <p className="footer"><a href="/#/message">查看全部</a></p>
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
                                onClick={(e) => {
                                    dispatch(fetchIssues('logOut'))
                                    this.state.checked = false
                                }}
                                ><Icon type="logout" /><span>登出</span></div>
        let logoutBox = <div className="fixed-logreg-box">
                            <Popover onClick={this.checkMessages}
                                content={contentWrap} title="New Message" trigger="click">
                                <div className="fixed-logreg-icon"><Icon type="user" />
                                    <span>
                                        {checked ? `${info.username}(0)` : `${info.username}(${messageLength})`}
                                    </span>
                                </div>
                            </Popover>
                            {logoutIcon}
                        </div>
        let logRegBox = <div className="fixed-logreg-box">{loginIcon}{registerIcon}</div>
        return (
            <div className={"fixed-log-div " + (this.state.scrollToBottom ? "log-div-showInMobile" : "")} >
                {loggedIn ? logoutBox : logRegBox}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, messages } = state
    const {
        loggedIn,
        info
    } = isLoggedIn || {
        loggedIn: false,
        info: {}
    }

    return {
        loggedIn,
        info,
        messages
    }
}

export default connect(mapStateToProps)(LoginingView)