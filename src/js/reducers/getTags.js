/**
 * Created by xilixjd on 17/3/7.
 */

import { RECEIVE_TAGS, REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js'


var defaultIssuesState = {
    isFetching: false,
    items: []
}

// getTags reducer
function getTags(state = defaultIssuesState, action) {
    switch (action.type) {
        // case REQUEST_ISSUES:
        //     return {
        //         ...state,
        //         isFetching: true
        //     }
        case RECEIVE_TAGS:
            // 接收issues
            return {
                ...state,
                isFetching: false,
                items: action.posts
            }

        default:
            return state;
    }
}

export default getTags