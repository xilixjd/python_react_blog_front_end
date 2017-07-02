/**
 * Created by xilixjd on 17/3/9.
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { LOGGING_SHOW, REG_SHOW, DOMAIN } from '../constants/ActionTypes.js'
import { logModalShow, fetchIssues } from '../actions/index.js'

import { Icon, Popover, Button, message, Spin } from 'antd'

import '../../css/loginingview.scss'
import '../../css/antd.scss'


class LoginingView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            scrollToBottom: false,
            messageLength: 0,
            success: () => {
                message.success('你有新消息')
            },
            username: '',
            isMessageFetching: false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props
        dispatch(fetchIssues('checkUser'))
        window.addEventListener('scroll', this.scrollToBottom.bind(this))
    }

    componentDidMount() {
        const { socket } = this.props
        socket.on('new_message', (msg) => {
            let currentUsername = this.props.info.username
            let username = msg.username
            if (currentUsername == username) {
                this.setState({
                    messageLength: msg.uncheckedMessagesLen
                })
                this.onNewMessage()
            }
        })
        socket.emit('new', 'msg')
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            messageLength: nextProps.info.uncheckedMessagesLen,
            username: nextProps.info.username,
            isMessageFetching: nextProps.messages.isMessageFetching
        })
    }

    componentWillUnmount() {
    }

    scrollToBottom = () => {
        const scrollHeight = document.documentElement.scrollHeight
        const eleScroll = document.body.scrollTop + document.documentElement.clientHeight
        if (scrollHeight <= 800) {
            this.setState({
                scrollToBottom: false
            })
            return
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

    onNewMessage = () => {
        this.state.success()
    }

    render() {
        let { dispatch } = this.props
        let loggedIn = this.props.loggedIn
        let info = this.props.info
        let isMessageFetching = this.props.messages.isMessageFetching
        let messages = this.props.messages.messages
        let messageLength, content, contentWrap
        let checked = this.state.checked
        messageLength = this.state.messageLength
        if (isMessageFetching) {
            contentWrap = (
                <div className="loginingView-div">
                    <div style={{textAlign: 'center', padding: '10px'}}>
                        <Spin size="small" />
                    </div>
                    <p className="footer"><a href="/#/message">查看全部</a></p>
                </div>
            )
        } else {
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
                        <span>: 
                            <a href={'/#' + item.href}>
                                {this.strLength(itemContent) > 16 ?
                                    itemContent.substring(0, 8) + '..' : itemContent}
                            </a>
                        </span>
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
                <Button style={{display: 'none'}} onClick={this.onNewMessage}>Success</Button>
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
        messages,
    }
}

export default connect(mapStateToProps)(LoginingView)