/**
 * Created by xilixjd on 17/3/27.
 */

import { GET_MENTIONS } from '../constants/ActionTypes.js'


const mentions = (state=[], action) => {
    switch (action.type) {
        case GET_MENTIONS:
            return action.posts
        // case INIT_MENTIONS:
        //     return []
        default:
            return state
    }
}

export default mentions
