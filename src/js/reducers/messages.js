/**
 * Created by xilixjd on 17/3/26.
 */

import { GET_MESSAGES, INIT_MESSAGES, REQUEST_MESSAGES } from '../constants/ActionTypes.js'


var defaultState = {
    isMessageFetching: false,
    messages: []
}


const messages = (state=defaultState, action) => {
    switch (action.type) {
        case REQUEST_MESSAGES:
            return {
                ...state,
                isMessageFetching: true
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.posts,
                isMessageFetching: false
            }
        case INIT_MESSAGES:
            return {
                ...state,
                isMessageFetching: false,
                messages: []
            }
        default:
            return state
    }
}

export default messages