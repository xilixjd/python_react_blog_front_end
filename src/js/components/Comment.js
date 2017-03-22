/**
 * Created by xilixjd on 17/3/3.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm.js'
import { fetchIssues } from '../actions/index.js'

import '../../css/comment.scss'


class CommentComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        const param = {
            blogId: this.props.params.id
        }
        dispatch(fetchIssues('getComments', param, ''))
    }

    render() {
        const comments = this.props.comments || []
        return (
            <div>
                {comments.map(comment =>
                    <CommentItem {...comment} key={comment.id}/>
                )}
                <CommentForm {...this.props}/>
            </div>
        )
    }
}


class CommentItem extends Component {
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

    render() {
        let md5 = require('md5')
        let md5Author = md5(this.props.author)
        let md5Url = `https://www.gravatar.com/avatar/${md5Author}?s=32`
        return (
            <div className="commentWrap" id={'comment' + this.props.id}>
                <a onClick={()=>this.scrollToAnchor('comment' + this.props.id)}>#</a>
                <div className="commentAvatar"><img src={md5Url}></img></div>
                <div>
                    <div className="commentAuthor">{this.props.author}</div>
                    <div className="commentContent">{this.props.content}</div>
                    <div className="commentTime"><span>{this.formatTime(this.props.time)}</span></div>
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