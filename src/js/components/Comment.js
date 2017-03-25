/**
 * Created by xilixjd on 17/3/3.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm.js'
import ReplyForm from './ReplyForm.js'
import { fetchIssues } from '../actions/index.js'

import '../../css/comment.scss'


class CommentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replyAuthor: '',
            replyDisplay: false
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
            replyDisplay: false
        }
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

    makeATToHref = (content) => {
        const regStr = /(@.*)\s/
        if (content.match(regStr)) {
            let ATHref = content.match(regStr)[1]
            let ATHrefHtml = `<a href="JavaScript:void(0)">${ATHref}</a>`
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
                            {/*this.onReplyClick('@' + this.props.author + ' ')*/}
                            this.onReplyClick()
                        }}
                            href="JavaScript:void(0)">回复</a>
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
    const { comments } = state

    return {
        comments
    }
}

export default connect(mapStateToProps)(CommentComponent)