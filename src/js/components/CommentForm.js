/**
 * Created by xilixjd on 17/3/6.
 */

import React, { Component } from 'react'
import { fetchIssues } from '../actions/index.js'
import { connect } from 'react-redux'
import { Input, Icon, Button, notification } from 'antd'


class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            content: ''
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            content: nextProps.replyAuthor
        })
    }

    componentDidUpdate() {
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        })
    }

    authorInputChange = (e) => {
        this.setState({ author: e.target.value})
    }

    contentInputChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    commentSubmit() {
        const { dispatch } = this.props
        let author = this.props.isLoggedIn.info.username || this.state.author.trim()
        let content = this.state.content.trim()
        if (author.length < 1) {
            this.openNotificationWithIcon('error', '发表评论', '姓名不能为空')
            return
        }
        if (content.length < 1) {
            this.openNotificationWithIcon('error', '发表评论', '评论内容不能为空')
            return
        }
        let param = {
            author: author,
            content: content,
            time: new Date().valueOf(),
            blogId: this.props.params.id
        }
        dispatch(fetchIssues('addComment', param))
        this.state.author = ''
        this.state.content = ''
        this.openNotificationWithIcon('success', '发表评论', '评论成功')
    }

    render() {
        let isLoggedIn = this.props.isLoggedIn
        let name = isLoggedIn.info.username || ''
        let content = this.state.content
        return (
            <div style={{margin: '10px'}}>
                <form onSubmit={
                    e => {
                        e.preventDefault()
                        this.commentSubmit()
                    }
                }>
                    <Input
                        style={{marginBottom: '10px', maxWidth: '250px'}}
                        type="text"
                        name="author"
                        placeholder="Enter your userName"
                        prefix={<Icon type="user" />}
                        onChange={this.authorInputChange}
                        value={name ? name : this.state.author}
                    />
                    <Input type="textarea" placeholder="content" name="content" rows={4}
                           style={{maxWidth: '410px', marginRight: '10px'}}
                           onChange={this.contentInputChange}
                           value={content}
                    />
                    <Button type="primary" htmlType="submit" size="large">评论</Button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { getABlog, comments, isLoggedIn } = state
    const {
        isFetching,
        blog
    } = getABlog || {
        isFetching: true,
        blog: {}
    }

    return {
        isFetching,
        blog,
        comments,
        isLoggedIn
    }
}

export default connect(mapStateToProps)(CommentForm)
