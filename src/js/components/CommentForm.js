/**
 * Created by xilixjd on 17/3/6.
 */

import React, { Component } from 'react'
import { fetchIssues } from '../actions/index.js'
import { connect } from 'react-redux'

import { Input, Icon, Button, notification, Mention } from 'antd'
const { toEditorState, toString } = Mention

const Scroll = require('react-scroll')
const scroller = Scroll.scroller
const scroll = Scroll.animateScroll


class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            content: '',
            suggestions: [],
            mentions: [],
            loading: false
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            content: nextProps.replyAuthor,
            mentions: nextProps.mentions
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

    contentInputChange = (editorState) => {
        this.setState({
            content: toString(editorState)
        })
    }

    fetchSuggestions = (value, callback) => {
        setTimeout(() => {
            callback()
        }, 500)
    }

    onSearchChange = (value) => {
        this.getMentions(value)
        this.fetchSuggestions(value, () => {
            this.setState({
                suggestions: this.state.mentions,
                loading: false,
            });
        })
        this.setState({
            loading: true,
        })
    }

    getMentions = (name) => {
        const { dispatch } = this.props
        dispatch(fetchIssues('getMentions', name))
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
            blogId: this.props.params.id,
            href: this.props.location.pathname
        }
        dispatch(fetchIssues('addComment', param))
        this.state.author = ''
        this.state.content = ''
        document.querySelector("span[data-text='true']").innerText = ''
        this.openNotificationWithIcon('success', '发表评论', '评论成功')
    }

    render() {
        let isLoggedIn = this.props.isLoggedIn
        let name = isLoggedIn.info.username || ''
        let content = this.state.content
        const { suggestions, loading } = this.state
        return (
            <div style={{margin: '10px'}}>
                <form onSubmit={
                    e => {
                        e.preventDefault()
                        this.commentSubmit()
                    }
                }>
                    <Input
                        style={{marginBottom: '10px', maxWidth: '250px', zIndex: 0}}
                        type="text"
                        name="author"
                        placeholder="Enter your userName"
                        prefix={<Icon type="user" />}
                        onChange={this.authorInputChange}
                        value={name ? name : this.state.author}
                    />
                    <div className="mentionDiv">
                        <Mention
                            className="mention"
                            style={{width: '100%', height: '100px'}}
                            suggestions={suggestions}
                            loading={loading}
                            onSearchChange={this.onSearchChange}
                            placeholder="可以 @用户"
                            onChange={this.contentInputChange}
                            multiLines
                        />
                        <Button type="primary" htmlType="submit" size="large">评论</Button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { getABlog, comments, isLoggedIn, mentions } = state
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
        isLoggedIn,
        mentions
    }
}

export default connect(mapStateToProps)(CommentForm)
