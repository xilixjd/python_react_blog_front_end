import React, {Component} from 'react'
import Comment from './Comment.js'
import { connect } from 'react-redux'
// import {CONFIG} from '../constants/Config.js'
import { fetchIssues, fetchIssuesIfNeeded, initBlog } from '../actions/index.js'

import marked from 'marked'
// import hljs from 'highlight.js'

import { BackTop, Spin } from 'antd'

// import Animate from 'rc-animate'

import '../../css/zenburn.scss'
import '../../css/article.scss'

// import pureRender from 'pure-render-decorator'

/*
<span color="black" bgcolor="#FF4500" style="
    background-color: #FF4500;">面把闭包</span>
*/


class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentShow: false,
        }
    }

    componentWillMount() {
        // window.scrollTo(0, 0)
        // const { dispatch } = this.props
        // dispatch(fetchIssuesIfNeeded('blog', this.props.params.id, 'receiveBlog'))

        // 代码高亮
        // marked.setOptions({
        //     highlight: function (code) {
        //         return hljs.highlightAuto(code).value;
        //     }
        // })
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssuesIfNeeded('blog', this.props.params.id, 'receiveBlog'))
    }

    // shouldComponentUpdate = (nextProps, nextState) => {
    //     return !(this.props === nextProps || is(this.props, nextProps)) ||
    //             !(this.state === nextState || is(this.state, nextState))
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params !== this.props.params) {
            const { dispatch } = nextProps
            dispatch(initBlog())
            dispatch(fetchIssuesIfNeeded('blog', nextProps.params.id, 'receiveBlog'))
        }
    }

    // 组件销毁前，将 reducer 中的缓存删除
    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(initBlog())
    }

    formatTime(timeStamp) {
        let time = new Date(timeStamp)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        return year + '-' + month + '-' + day
    }

    getCheckHash() {
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

    // 转换 search 参数 为正则表达式（或运算）
    switchSearchQueryToReg = (query) => {
        let regStr = ""
        if (Array.isArray(query)) {
            for (let i = 0; i < query.length; i++) {
                if (query[i].replace(/(^\s*)|(\s*$)/g, "")) {
                    regStr += query[i] + '|'
                }
            }
            if (regStr.replace(/(^\s*)|(\s*$)/g, "")) {
                return new RegExp('(' + regStr.substring(0, regStr.length - 1) + ')', 'gi')
            } else {
                return false
            }
        } else {
            regStr += query
            if (regStr.replace(/(^\s*)|(\s*$)/g, "")) {
                return new RegExp('(' + regStr + ')', 'gi')
            } else {
                return false
            }
        }
    }

    render() {
        let time = this.props.blog.time
        if (!this.props.isFetching) {
            this.state.contentShow = true
        }
        let title = this.props.blog.title
        let content = this.props.blog.content
        let reg = this.switchSearchQueryToReg(this.props.location.query.search)
        // markdown bug 空格 bug 得到分词结果
        if (content && title && reg) {
            content = content.replace(reg,
            `<span style="color: black; background-color: #FF4500; display: inline-block;">$1</span>`)
            title = title.replace(reg,
            `<span style="color: black; background-color: #FF4500; display: inline-block;">$1</span>`)
        }
        return (
            <div className="articleComment">
                {this.props.isFetching ?
                    <ul className="column-entry-list" >
                        <li className="entry-masker">
                            <div className="info-row user-meta-row">
                                <div className="user-avatar masker"></div>
                                <div className="username masker"></div>
                            </div>
                            <div className="info-row screenshot-row masker"></div>
                            <div className="info-row entry-abstract-row">
                                <div className="entry-title masker"></div>
                                <div className="entry-description masker"></div>
                            </div>
                            <div className="info-row entry-meta-row">
                                <div className="meta-badge masker"></div>
                                <div className="entry-action-box">
                                    <div className="entry-action masker"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                        :
                    <div className="article">
                        <h1 className="article-title" dangerouslySetInnerHTML={{__html: title || ''}}></h1>
                        <p className="article-time">{this.state.contentShow ? this.formatTime(time) : ''}</p>
                        <div className="article-desc article-content"
                             dangerouslySetInnerHTML={{__html: marked(content || '')}}>
                        </div>
                    </div>
                }
                <div className="comment">
                    {this.state.contentShow ? <Comment {...this.props}/> : ''}
                </div>
                <div>
                    <BackTop/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { getABlog, comments } = state
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
        comments
    }
}

export default connect(mapStateToProps)(Article)