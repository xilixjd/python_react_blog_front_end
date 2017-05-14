/**
 * Created by xilixjd on 17/3/3.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import CommentForm from './CommentForm.js'
import ReplyForm from './ReplyForm.js'
import { fetchIssues, receiveComments } from '../actions/index.js'
import { INIT_COMMENTS } from '../constants/ActionTypes.js'

import NProgress from 'nprogress'

import { DOMAIN } from '../constants/ActionTypes.js'

import { Spin, Pagination } from 'antd'

import '../../css/comment.scss'

// https://github.com/felixgirault/pure-render-decorator
// 采用 pureRender 后渲染次数降低一次。。
// import pureRender from 'pure-render-decorator'

// https://github.com/fisshy/react-scroll
const Scroll = require('react-scroll')
const scroller = Scroll.scroller
const scrollToBottom = Scroll.animateScroll.scrollToBottom
const Events = Scroll.Events


class CommentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replyAuthor: '',
            replyDisplay: false,
            scrolled: false,
            // comments: {},
            // firstLoad: true
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        const { dispatch } = this.props
        const param = {
            blogId: this.props.params.id,
            pageIdx: this.props.location.query.pageIdx || ''
        }
        dispatch(fetchIssues('getComments', param, ''))
        // 注册一个 scroll 开始的函数，背景颜色会显示 2s
        Events.scrollEvent.register('end', function(to, element) {
            let anchorDivClassName = 'showBackgroundColor'
            if (element.className.indexOf(anchorDivClassName) == -1) {
                element.className += ` ${anchorDivClassName}`
            }
            let timeOut = setTimeout(() => {
                this.removeClass(element, anchorDivClassName)
            }, 2500)
            this.setState({
                scrolled: true
            })
        }.bind(this))
    }

    componentWillReceiveProps(nextProps) {
        // if(this.state.firstLoadPage) {
        //     const { dispatch } = nextProps
        //     const param = {
        //         blogId: nextProps.params.id,
        //         pageIdx: nextProps.location.query.pageIdx || ''
        //     }
        //     dispatch(fetchIssues('getComments', param, ''))
        //     this.state.firstLoadPage = false
        // }

        // if (!this.state.comments[this.props.location.query.pageIdx || 1] || this.state.firstLoad) {
        //     if (nextProps.comments.comments.length) {
        //         this.state.comments[this.props.location.query.pageIdx || 1] = nextProps.comments.comments
        //         this.state.firstLoad = false
        //     }
        // }
        if (nextProps.location.query !== this.props.location.query) {
            const { dispatch } = nextProps
            const param = {
                blogId: nextProps.params.id,
                pageIdx: nextProps.location.query.pageIdx || ''
            }
            this.setState({
                scrolled: false
            })
            receiveComments(INIT_COMMENTS, '')
            dispatch(fetchIssues('getComments', param, ''))
        }
    }

    componentDidUpdate() {
    }

    // import { is } from 'immutable'
    // shouldComponentUpdate = (nextProps, nextState) => {
    //     return !(this.props === nextProps || is(this.props, nextProps)) ||
    //             !(this.state === nextState || is(this.state, nextState))
    // }

    componentWillUnmount() {
        Events.scrollEvent.remove('end')
        receiveComments(INIT_COMMENTS, '')
    }

    onCommentItemChange = (newState) => {
        this.setState({
            // replyAuthor: newState
        })
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

    scrollToComment = (elementName) => {
        if (document.querySelector(`[name=${elementName}]`)) {
            scroller.scrollTo(elementName, {
                delay: 0,
                duration: 1000,
                smooth: 'easeInOutQuint'
            })
        }
    }

    onPageChange = (page, pageSize) => {
        const { dispatch } = this.props
        const param = {
            blogId: this.props.params.id,
            pageIdx: page,
            quantity: pageSize
        }
        dispatch(fetchIssues('getComments', param, ''))
        hashHistory.push({
            pathname: `/post/${this.props.params.id}`,
            query: { pageIdx: page }
        })
        let anchorElement = document.getElementById("allComments")
        if(anchorElement && !this.props.comments.isCommentsFetching) {
            // anchorElement.scrollIntoView()
            this.scrollToComment("allComments")
        }
    }

    render() {
        let isCommentsFetching = this.props.comments.isCommentsFetching
        if (isCommentsFetching) {
            return (
                <div style={{textAlign: 'center', marginTop: '50px'}}>
                    <Spin size="large"/>
                </div>
            )
        }else {
            if (this.getCheckHash() && !this.state.scrolled) {
                this.scrollToComment(this.getCheckHash())
            }
            NProgress.done()
        }
        const comments = this.props.comments.comments || []
        const paging = this.props.comments.paging
        const currentPage = parseInt(this.props.location.query.pageIdx) || 1
        const replyAuthor = this.state.replyAuthor
        return (
            <div id="allComments" name="allComments">
                {comments.map((comment, index) => {
                    if (comment.new_sign && index == comments.length - 1) {
                        {/*this.scrollToComment('comment' + comment.new_sign)*/}
                    }
                    return (
                        <CommentItem {...this.props}
                                     {...comment} key={comment.id}
                                     callbackParent={this.onCommentItemChange}
                        />
                    )
                }
                )}
                <div className="page">
                    <Pagination current={currentPage} total={paging.totalCount}
                                showQuickJumper
                                pageSize={paging.quantity} onChange={this.onPageChange}/>
                </div>
                <CommentForm {...this.props}
                             replyAuthor={ replyAuthor }
                             scrollToBottom={ scrollToBottom }
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
            body: `href=${this.props.location.pathname + this.props.location.search}`
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
            <div className="commentWrap" id={'comment' + this.props.id} name={'comment' + this.props.id}>
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