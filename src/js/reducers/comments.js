/**
 * Created by xilixjd on 17/3/6.
 */

import { ADD_COMMENT, RECEIVE_COMMENTS } from '../constants/ActionTypes.js'


var defaultIssuesState = [{
    content: 'content',
    author: 'xilixjd',
    time: 3023,
    id: 0
}]

const comments = (state=[], action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return [...state,
            {
                id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                content: action.param.content,
                author: action.param.author,
                time: action.param.time
            }]

        case RECEIVE_COMMENTS:
            return action.posts

        default:
            return state
    }
}

export default comments