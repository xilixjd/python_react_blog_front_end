/**
 * Created by xilixjd on 17/3/6.
 */
import { REQUEST_ISSUES, RECEIVE_ISSUES, INIT_ISSUES } from '../constants/ActionTypes.js'


var defaultIssuesState = {
    isFetching: false,
    items: []
}

// issues reducer
function postIssues(state = defaultIssuesState, action) {
    switch (action.type) {
        case REQUEST_ISSUES:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_ISSUES:
            // 接收issues
            return {
                ...state,
                isFetching: false,
                items: action.posts
            }
        case INIT_ISSUES:
            return {
                ...state,
                isFetching: false,
                items: []
            }
        default:
            return state;
    }
}

export default postIssues