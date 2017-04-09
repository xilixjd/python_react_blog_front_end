/**
 * Created by xilixjd on 17/3/6.
 */

import { ADD_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS } from '../constants/ActionTypes.js'


var defaultIssuesState = {
    comments: [],
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
                new_sign: action.param.id
            }
            let comments = state.comments
            comments.push(new_comment)
            return {
                ...state,
                comments: comments
            }

        case REQUEST_COMMENTS:
            return {
                ...state,
                isCommentsFetching: true
            }

        case RECEIVE_COMMENTS:
            return {
                comments: action.posts,
                isCommentsFetching: false
            }

        default:
            return state
    }
}

export default comments