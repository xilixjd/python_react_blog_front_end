/**
 * Created by xilixjd on 17/3/9.
 * */

import { LOG_IN, LOG_OUT } from '../constants/ActionTypes.js'

const isLoggedIn = (state={ loggedIn: false, info: { message: [{one: 1}, {two: 2}] } }, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                loggedIn: true,
                info: action.info
                // info: { message: [{one: 1}, {two: 2}], username: 'xjd' }
            }

        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                info: {}
            }

        default:
            return state
    }
}

export default isLoggedIn