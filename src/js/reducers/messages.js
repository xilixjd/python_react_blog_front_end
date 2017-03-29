/**
 * Created by xilixjd on 17/3/26.
 */

import { GET_MESSAGES, INIT_MESSAGES, GET_MENTIONS } from '../constants/ActionTypes.js'


const messages = (state=[], action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.posts
        case INIT_MESSAGES:
            return []
        default:
            return state
    }
}

export default messages