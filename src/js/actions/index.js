import fetch from 'isomorphic-fetch';
import { DOMAIN, RECEIVE_TAGS, REQUEST_ISSUES, REQUEST_BLOG, RECEIVE_BLOG, RECEIVE_ISSUES, INIT_ISSUES, ADD_COMMENT, REQUEST_COMMENTS, RECEIVE_COMMENTS, LOG_IN, LOG_OUT } from '../constants/ActionTypes.js'
import { LOGGING_SHOW, REG_SHOW, MODAL_CLOSE, LOGIN_SUBMIT, REG_SUBMIT, INIT_BLOG, REQUEST_MESSAGES, GET_MESSAGES, INIT_MESSAGES, CHECK_MESSAGES } from '../constants/ActionTypes.js'
import { GET_MENTIONS } from '../constants/ActionTypes.js'
import {CONFIG} from '../constants/Config.js'
import { notification } from 'antd'


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
    })
}

// 接收评论
export const receiveComments = (type, json) => {
    switch (type) {
        case ADD_COMMENT:
            return {
                type: ADD_COMMENT,
                param: json
            }
        case REQUEST_COMMENTS:
            return {
                type: REQUEST_COMMENTS
            }
        case RECEIVE_COMMENTS:
            return {
                type: RECEIVE_COMMENTS,
                posts: json
            }
    }
}

// 接收 blog
export const receiveBlog = (type, blog) => {
    switch (type) {
        case REQUEST_BLOG:
            return {
                type: REQUEST_BLOG
            }
        case RECEIVE_BLOG:
            return {
                type: RECEIVE_BLOG,
                blog
            }
    }
}


// 接收 文章列表
export function receiveIssues(type, json) {
    switch (type) {
        case REQUEST_ISSUES:
            return {
                type: REQUEST_ISSUES
            }
        case RECEIVE_ISSUES:
            return {
                type: RECEIVE_ISSUES,
                posts: json
            }
        case INIT_ISSUES:
            return {
                type: INIT_ISSUES
            }
    }
}

// 接收 tags
function receiveTags(json) {
    return {
        type: RECEIVE_TAGS,
        posts: json
    }
}

// 登录、登出状态
function logState(type, json) {
    switch (type) {
        case LOG_IN:
            return {
                type: LOG_IN,
                info: json
            }
        case LOG_OUT:
            return {
                type: LOG_OUT
            }
        case CHECK_MESSAGES:
            return {
                type: CHECK_MESSAGES,
                info: json
            }
    }

}

// 登录、注册 modal show
export function logModalShow(type, json) {
    switch (type) {
        case LOGGING_SHOW:
            return {
                type: LOGGING_SHOW,
                isShow: type
            }
        case REG_SHOW:
            return {
                type: REG_SHOW,
                isShow: type
            }
        case MODAL_CLOSE:
            return {
                type: MODAL_CLOSE,
                isShow: false
            }
        case LOGIN_SUBMIT:
            return {
                type: LOGIN_SUBMIT,
                data: json
            }
        case REG_SUBMIT:
            return {
                type: REG_SUBMIT,
                data: json
            }
    }
}

export function initBlog() {
    return {
        type: INIT_BLOG
    }
}

export function getMessages(type, json) {
    switch (type) {
        case REQUEST_MESSAGES:
            return {
                type: REQUEST_MESSAGES
            }
        case GET_MESSAGES:
            return {
                type: GET_MESSAGES,
                posts: json
            }
        case INIT_MESSAGES:
            return {
                type: INIT_MESSAGES
            }
    }
}

export function getMentions(type, json) {
    switch (type) {
        case GET_MENTIONS:
            return {
                type: GET_MENTIONS,
                posts: json
            }
    }
}

// thunk action creater
// @param 请求参数
export function fetchIssues(filter, param) {
    return dispatch => {
        let url
        let data

        switch (filter) {
            case 'all':
                dispatch(receiveIssues(REQUEST_ISSUES, ''))
                url = DOMAIN + '/api/blog/all'
                return fetch(url, {
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => {
                            return dispatch(receiveIssues(RECEIVE_ISSUES, json))
                        }
                ).catch(e => {
                    console.log(e)
                    openNotificationWithIcon('error', 'error', e)
                })

            case 'blog':
                dispatch(receiveBlog(REQUEST_BLOG, ''))
                url = DOMAIN + '/api/blog/' + param
                return fetch(url, {
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => dispatch(receiveBlog(RECEIVE_BLOG, json))
                ).catch(
                    e => {
                        console.log(e)
                        openNotificationWithIcon('error', 'error', e)
                    }
                )

            case 'tags':
                dispatch(receiveIssues(REQUEST_ISSUES, ''))
                if (param) {
                    url = DOMAIN + '/api/blog/tag/' + param
                    return fetch(url, {
                        credentials: 'include'
                    }).then(
                        response => response.json()
                    ).then(
                        json => dispatch(receiveIssues(RECEIVE_ISSUES, json))
                    ).catch(
                        e => {
                            console.log(e)
                            openNotificationWithIcon('error', 'error', e)
                        }
                    )
                } else {
                    url = DOMAIN + '/api/blog/tag'
                    return fetch(url, {
                        credentials: 'include'
                    }).then(
                        response => response.json()
                    ).then(
                        json => dispatch(receiveTags(json))
                    ).catch(
                        e => {
                            console.log(e)
                            openNotificationWithIcon('error', 'error', e)
                        }
                    )
                }

            case 'addComment':
                url = DOMAIN + '/api/blog/' + param.blogId + '/comment'
                var replyTo = param.replyTo || ''
                var href = param.href || ''
                data = `author=${param.author}&content=${param.content}&replyTo=${replyTo}&href=${href}`
                return fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: data,
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => dispatch(receiveComments(ADD_COMMENT, json))
                ).catch(
                    e => {console.log(e)}
                )

            case 'getComments':
                dispatch(receiveComments(REQUEST_COMMENTS, ''))
                url = DOMAIN + '/api/blog/' + param.blogId + '/comment'
                return fetch(url, {
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => dispatch(receiveComments(RECEIVE_COMMENTS, json))
                ).catch(
                    e => {console.log(e)}
                )

            case 'logIn':
                url = DOMAIN + '/api/login'
                data = `username=${param.username}`
                return fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    credentials: 'include',
                    body: data
                }).then(
                    response => response.json()
                ).then(
                    json => {
                        if (json) {
                            dispatch(logState(LOG_IN, json))
                            dispatch(logModalShow(MODAL_CLOSE))
                        }
                    }
                ).catch(
                    e => {console.log(e)}
                )

            case 'logOut':
                url = DOMAIN + '/api/logout'
                return fetch(url, {
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => dispatch(logState(LOG_OUT, json))
                ).catch(
                    e => {console.log(e)}
                )

            case 'register':
                url = DOMAIN + '/api/register'
                data = `username=${param.username}&password=${param.password}&email=${param.email}`
                return fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    credentials: 'include',
                    body: data
                }).then(
                    response => response.json()
                ).then(
                    json => {
                        if (json) {
                            dispatch(logModalShow(REG_SUBMIT, json))
                            dispatch(logModalShow(MODAL_CLOSE))
                        }
                    }
                ).catch(
                    e => {console.log(e)}
                )

            case 'checkUser':
                url = DOMAIN + '/api/user'
                return fetch(url, {
                    credentials: 'include',
                }).then(
                    (response) => {
                        // fetch 状态码
                        if (response.status == 200) {
                            return response.json()
                        } else {
                            return
                        }
                    }
                ).then(
                    json => {
                        if (json) {
                            return dispatch(logState(LOG_IN, json))
                        } else {
                            return dispatch(logState(LOG_OUT))
                        }
                    }
                ).catch(
                    // e => {console.log(e)}
                )

            case 'checkMessages':
                dispatch(getMessages(REQUEST_MESSAGES, ''))
                url = DOMAIN + '/api/checkMessages'
                return fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => dispatch(getMessages(GET_MESSAGES, json))
                )

            case 'getMessages':
                url = DOMAIN + '/api/message'
                return fetch(url, {
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => dispatch(getMessages(GET_MESSAGES, json))
                )

            case 'getMentions':
                url = DOMAIN + '/api/usernameMention'
                data = `name=${param}`
                return fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: data
                }).then(
                    response => response.json()
                ).then(
                    json => dispatch(getMentions(GET_MENTIONS, json))
                )
            // case 'archieve':
            //     url = 'http://127.0.0.1:5000/api/blog/archieve'
            //     return fetch(url).then(
            //         response => response.json()
            //     ).then(
            //         json => dispatch(receiveIssues(json))
            //     ).catch(
            //         e => {console.log(e)}
            //     )
        }

    };
}

function shouldFetchIssues(state, type) {
    return true
    // 需改进， postIssues 用的组件过多，无法判断
    // switch (type) {
    //     case 'postIssues':
    //         const posts = state.postIssues
    //         if (!posts) {
    //             return true
    //         }
    //         if (posts.isFetching) {
    //             return false
    //         }
    //
    //         return !posts.items.length
    //
    //     case 'receiveBlog':
    //         const blog = state.getABlog
    //         let pathNameArray = location.hash.split('/')
    //         let hashId = pathNameArray[pathNameArray.length - 1]
    //         if (hashId != blog.blog.id) {
    //             return true
    //         }
    //         if (!blog) {
    //             return true
    //         }
    //         if (blog.isFetching) {
    //             return false
    //         }
    //
    //         return !blog.blog.content
    //
    //     default:
    //         return true
    // }
}

// 按需获取issues
export function fetchIssuesIfNeeded(filter, param, type) {
    // 当已经有issues的时候，则减少网络请求
    return function (dispatch, getState) {
        if (shouldFetchIssues(getState(), type)) {
            // 在 thunk 里 dispatch 另一个 thunk！
            return dispatch(fetchIssues(filter, param));
        } else {
            // 告诉调用代码不需要再等待。
            return Promise.resolve();
        }
    };
}












