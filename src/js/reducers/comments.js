/**
 * Created by xilixjd on 17/3/6.
 */

import { ADD_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS, INIT_COMMENTS, DELETE_COMMENT } from '../constants/ActionTypes.js'


var defaultIssuesState = {
    comments: [],
    paging: {
        pageIdx: 1,
        quantity: 20,
        totalCount: 1
    },
    isCommentsFetching: false
}

const comments = (state=defaultIssuesState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            let new_comment = {
                // id: state.comments.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                id: action.param.id,
                content: action.param.content,
                author: action.param.author,
                time: action.param.time,
                receiver: action.param.receiver,
                zan_count: action.param.zan_count,
                liked: action.param.liked,
                new_sign: action.param.id,
                allow_delete: action.param.allow_delete
            }
            let comments = state.comments
            comments.push(new_comment)
            return {
                ...state,
                paging: {
                    pageIdx: state.paging.pageIdx,
                    quantity: state.paging.quantity,
                    totalCount: state.paging.totalCount += 1
                },
                comments: comments
            }
        
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment =>
                    comment.id !== action.posts.id
                )
            }

        case REQUEST_COMMENTS:
            return {
                ...state,
                isCommentsFetching: true
            }

        case RECEIVE_COMMENTS:
            return {
                ...state,
                comments: action.posts.data,
                paging: action.posts.paging,
                isCommentsFetching: false
            }

        case INIT_COMMENTS:
            return {
                ...state,
                comments: []
            }

        default:
            return state
    }
}

export default comments