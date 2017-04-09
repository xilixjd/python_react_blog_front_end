/**
 * Created by xilixjd on 17/3/3.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm.js'
import ReplyForm from './ReplyForm.js'
import { fetchIssues } from '../actions/index.js'

import { DOMAIN } from '../constants/ActionTypes.js'

import '../../css/comment.scss'


class CommentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replyAuthor: '',
            replyDisplay: false,
            anchorDivClassName: ''
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        const param = {
            blogId: this.props.params.id
        }
        dispatch(fetchIssues('getComments', param, ''))
    }

    onCommentItemChange = (newState) => {
        this.setState({
            // replyAuthor: newState
        })
    }

    render() {
        const comments = this.props.comments || []
        const replyAuthor = this.state.replyAuthor
        return (
            <div>
                {comments.map(comment =>
                    <CommentItem {...this.props}
                                 {...comment} key={comment.id}
                                 callbackParent={this.onCommentItemChange}
                    />
                )}
                <CommentForm {...this.props}
                             replyAuthor={ replyAuthor }
                />
            </div>
        )
    }
}


class CommentItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replyDisplay: false,
            liked: false,
            zan_count: 0
        }
    }

    componentDidMount() {
        this.setState({
            liked: this.props.liked,
            zan_count: this.props.zan_count
        })
        this.scrollToHash()
    }

    componentWillReceiveProps(nextProps) {
    }

    formatTime(timeStamp) {
        let time = new Date(timeStamp)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let hour = time.getHours()
        let min = time.getMinutes()
        let sec = time.getSeconds()
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`
    }

    onReplyClick = () => {
        // this.props.callbackParent(replyAuthor)
        this.setState({
            replyDisplay: !this.state.replyDisplay
        })
    }

    onZanClick = (loggedIn, id) => {
        if (!loggedIn) {
            return
        }
        let url = DOMAIN + `/api/comment/${id}/zan`
        return fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            credentials: 'include',
            body: `href=${this.props.location.pathname}`
        }).then(
            response => response.json()
        ).then(
            json => {
                this.setState({
                    zan_count: json,
                    liked: !this.state.liked
                })
            }
        )
    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName)
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) {
                anchorElement.scrollIntoView()
            }
        }
    }

    removeClass = (ele, cls) => {
        let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)")
        ele.className = ele.className.replace(reg, " ")
    }

    getCheckHash = () => {
        let hashStr = window.location.hash
        let hashArray = hashStr.split('#')
        let hash
        if (hashArray.length > 2) {
            hash = hashArray[hashArray.length - 1]
            return hash
        } else {
            return false
        }
    }

    scrollToHash = () => {
        let hash = this.getCheckHash()
        if (hash) {
            let anchorElement = document.getElementById(hash)
            if(anchorElement) {
                anchorElement.scrollIntoView()
                this.state.anchorDivClassName = 'showBackgroundColor'
                let anchorDivClassName = this.state.anchorDivClassName
                anchorElement.className += ` ${anchorDivClassName}`
                anchorElement.scrollIntoView()
                let timeOut = setTimeout(() => {
                    this.removeClass(anchorElement, anchorDivClassName)
                }, 2500)
            } else {
                return
            }
        } else {
            return
        }
    }

    makeATToHref = (content) => {
        const regStr = /(@.*?)\s/g
        if (content.match(regStr)) {
            let ATHref = content.match(regStr)
            let ATHrefHtml = `<a href="JavaScript:void(0)">$1</a>`
            // 正则技巧 (.*?) 贪婪匹配 匹配中间的内容
            // $1 代表括号内的内容
            return content.replace(regStr, ATHrefHtml)
        }
        return content
    }

    render() {
        let md5 = require('md5')
        let md5Author = md5(this.props.author)
        let md5Url = `https://www.gravatar.com/avatar/${md5Author}?s=32`
        let content = this.props.content
        let reply = ' 回复 '
        let author = this.props.author
        let receiver = this.props.receiver
        let liked = this.state.liked
        let zan_count = this.state.zan_count
        let loggedIn = this.props.isLoggedIn.loggedIn
        // this.props.reiceiver 不能及时追踪到
        return (
            <div className="commentWrap" id={'comment' + this.props.id}>
                <a onClick={()=>this.scrollToAnchor('comment' + this.props.id)}>#</a>
                <div className="commentAvatar"><img src={md5Url}></img></div>
                <div style={{width: '100%'}}>
                    <div className="commentAuthor">{author}
                        {this.props.receiver ? <span>{reply}{receiver}</span> : ''}
                    </div>
                    <div className="commentContent"
                         dangerouslySetInnerHTML={{__html: this.makeATToHref(content)}}>
                    </div>
                    <div className="commentTime">
                        <span>{this.formatTime(this.props.time)}</span>
                        <a  onClick={() => {
                            this.onReplyClick()
                        }}
                            href="JavaScript:void(0)">回复</a>
                        <a onClick={() => {
                            this.onZanClick(loggedIn, this.props.id)
                        }}
                            href="JavaScript:void(0)">
                            {liked == 0 ? '赞' : '取消赞'}
                            <span>({zan_count})</span>
                        </a>
                    </div>
                    <div className="commentReply" style={{display: this.state.replyDisplay ? 'block' : 'none'}}>
                        <ReplyForm {...this.props} replyTo={this.props.id} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { comments, isLoggedIn } = state

    return {
        comments,
        isLoggedIn
    }
}

export default connect(mapStateToProps)(CommentComponent)