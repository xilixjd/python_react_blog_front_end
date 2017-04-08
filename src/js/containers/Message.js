import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIssues, getMessages } from '../actions/index.js'
import { INIT_MESSAGES } from '../constants/ActionTypes.js'

import { Spin } from 'antd'

import '../../css/message.scss'

class Message extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssues('getMessages', ''))
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(getMessages(INIT_MESSAGES, ''))
    }

    formatTime(timeStamp) {
        let time = new Date(timeStamp)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        return year + '-' + month + '-' + day
    }

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

    formatMessages(items) {
        let timeDict = {}
        for (let i = 0; i < items.length; i++) {
            let formattedTime = this.formatTime(items[i].time)
            if (!timeDict[formattedTime]) {
                timeDict[formattedTime] = []
                timeDict[formattedTime].push(items[i])
            } else {
                timeDict[formattedTime].push(items[i])
            }
        }
        return timeDict
    }

    render() {
        let messages = this.props.messages.messages
        let isMessageFetching = this.props.messages.isMessageFetching
        let timeDict = this.formatMessages(messages)
        let view = []
        for (let formattedTime in timeDict) {
            view.push(<h2 key={formattedTime} className="category">{formattedTime}</h2>)
            for (let i = 0; i < timeDict[formattedTime].length; i++) {
                view.push(
                    <li key={timeDict[formattedTime][i]['id']}
                        className={this.timeFromNowLittleThan2Hour(timeDict[formattedTime][i]['time']) ?
                            'unchecked' : ''
                        }>
                        <span className="messageType">{timeDict[formattedTime][i]['message_type']}  </span>
                        <a href="JavaScript:void(0)">@{timeDict[formattedTime][i].sender}</a>
                        <span>:
                            {this.strLength(timeDict[formattedTime][i].content) <= 120 ?
                                <a href={'/#' + timeDict[formattedTime][i].href}> {timeDict[formattedTime][i].content}</a> :
                                <a href={'/#' + timeDict[formattedTime][i].href}> {timeDict[formattedTime][i].content.substring(0, 62) + '...'}</a>
                            }
                        </span>
                    </li>
                )
            }
        }
        return (
            <div className="messageDiv">
                {isMessageFetching ?
                    <div style={{textAlign: 'center'}}>
                        <Spin size="large"/>
                    </div>
                    :
                    view
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { messages } = state
    return {
        messages
    }
}

export default connect(mapStateToProps)(Message);


class MessageItem extends Component {
    render() {
        return (
            <div>
                <h2 className="messageTime">{this.props.time}</h2>
                <ul>
                    {
                        this.props.items.map((item, index) =>
                            <li key={index}></li>
                        )
                    }
                </ul>
            </div>
        )
    }
}