/**
 * Created by xilixjd on 17/3/24.
 */

import React, { Component } from 'react'
import { fetchIssues } from '../actions/index.js'
import { connect } from 'react-redux'

import { Input, Button } from 'antd'

const Scroll = require('react-scroll')
const scrollToBottom = Scroll.animateScroll.scrollToBottom


class ReplyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    contentInputChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    commentSubmit = () => {
        const { dispatch } = this.props
        let author = this.props.isLoggedIn.info.username || 'Annoymous'
        let content = this.state.content.trim()
        let param = {
            author: author,
            content: content,
            time: new Date().valueOf(),
            blogId: this.props.params.id,
            replyTo: this.props.replyTo,
            href: this.props.location.pathname + this.props.location.search
        }
        dispatch(fetchIssues('addComment', param))
        this.setState({ content: '' })
        scrollToBottom()
    }

    render() {
        let content = this.state.content
        return(
            <div>
                <form onSubmit={
                    e => {
                        e.preventDefault()
                        this.commentSubmit()
                    }
                }>
                    <Input
                        style={{width: '75%'}}
                        type="textarea"
                        name="content"
                        placeholder="reply"
                        onChange={this.contentInputChange}
                        value={content}
                        autosize
                    />
                    <Button type="primary" htmlType="submit" style={{marginLeft: '5px'}}>
                        回复
                    </Button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state

    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(ReplyForm)