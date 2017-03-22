import React, {Component} from 'react'
import Comment from './Comment.js'
import { connect } from 'react-redux'
import marked from 'marked';
import hljs from 'highlight.js';
import {CONFIG} from '../constants/Config.js'
import { fetchIssuesIfNeeded } from '../actions/index.js'
import { BackTop } from 'antd'

import '../../css/zenburn.scss';
import '../../css/article.scss';

class Article extends Component {
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
        // 显示多说评论框
        // this.toggleDuoshuoComment();
        // 比较野鸡 看有没有更好的方法 1. 渲染完成后 调用 scrollToHash 或 2. 找出不能实现正常功能的原因
        let timer = setInterval(() => {
            this.scrollToHash()
            clearInterval(timer)
        }, 100)
        const { dispatch } = this.props
        dispatch(fetchIssuesIfNeeded('blog', this.props.params.id, 'receiveBlog'))
    }

    componentWillReceiveProps(nextProps) {
    }

    // toggleDuoshuoComment() {
    //     let ele = this.refs['ds'];
    //     try {
    //         window.DUOSHUO.EmbedThread(ele);
    //     } catch (e) {
    //
    //     }
    // }

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

    scrollToHash() {
        let hash = this.getCheckHash()
        if (hash) {
            let anchorElement = document.getElementById(hash)
            if(anchorElement) {
                anchorElement.scrollIntoView()
                console.log('true')
            }
        }
    }

    render() {
        let time = this.props.blog.time
        return (
            <div>
                <div className="article">
                    <h1 className="article-title">{this.props.blog.title}</h1>
                    <p className="article-time">{this.formatTime(time)}</p>
                    <div className="article-desc article-content"
                         dangerouslySetInnerHTML={{__html: marked(this.props.blog.content || '')}}>
                    </div>
                </div>
                <div className="comment">
                    {/*<div ref="ds" className="ds-thread" data-thread-key={this.props.number} data-title={this.props.title} data-url={window.location.href}></div>*/}
                    <Comment {...this.props}/>
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