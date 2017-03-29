import React, {Component} from 'react'
import Comment from './Comment.js'
import { connect } from 'react-redux'
import marked from 'marked';
import hljs from 'highlight.js';
import {CONFIG} from '../constants/Config.js'
import { fetchIssues, fetchIssuesIfNeeded, initBlog } from '../actions/index.js'
import { BackTop } from 'antd'

import '../../css/zenburn.scss';
import '../../css/article.scss';

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentShow: false,
            timer: '',
            anchorDivClassName: ''
        }
    }

    componentWillMount() {
        // window.scrollTo(0, 0)
        // const { dispatch } = this.props
        // dispatch(fetchIssuesIfNeeded('blog', this.props.params.id, 'receiveBlog'))
        // console.log(this.props)

        // 代码高亮
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        })
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssuesIfNeeded('blog', this.props.params.id, 'receiveBlog'))
        dispatch(fetchIssues('checkUser'))
    }

    componentWillReceiveProps(nextProps) {
    }

    // 组件销毁前，将 reducer 中的缓存删除
    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(initBlog())
        clearInterval(this.state.timer)
        this.setState({
            anchorDivClassName: ''
        })
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

    removeClass = (ele, cls) => {
        let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)")
        ele.className = ele.className.replace(reg, " ")
    }

    scrollToHash() {
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
            }
        }
    }

    intervalScroll() {
        // 比较野鸡 看有没有更好的方法 1. 渲染完成后 调用 scrollToHash 或 2. 找出不能实现正常功能的原因
        this.state.timer = setInterval(() => {
            this.scrollToHash()
            clearInterval(this.state.timer)
        }, 100)
    }

    render() {
        let time = this.props.blog.time
        if (this.props.blog.content) {
            this.state.contentShow = true
            this.intervalScroll()
        }
        return (
            <div className="articleComment">
                <div className="article">
                    <h1 className="article-title">{this.props.blog.title}</h1>
                    <p className="article-time">{this.state.contentShow ? this.formatTime(time) : ''}</p>
                    <div className="article-desc article-content"
                         dangerouslySetInnerHTML={{__html: marked(this.props.blog.content || '')}}>
                    </div>
                </div>
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