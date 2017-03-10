/**
 * Created by xilixjd on 17/3/9.
 */

import { LOGGING_SHOW, REG_SHOW, MODAL_CLOSE, LOGIN_SUBMIT, REG_SUBMIT} from '../constants/ActionTypes.js'

const logModalShow = (state={isShow: false, data: {}}, action) => {
    switch (action.type) {
        case LOGGING_SHOW:
            return {
                ...state,
                isShow: action.isShow
            }
        case REG_SHOW:
            return {
                ...state,
                isShow: action.isShow
            }
        case MODAL_CLOSE:
            return {
                ...state,
                isShow: false
            }
        case LOGIN_SUBMIT:
            return {
                ...state,
                data: action.data
            }
        case REG_SUBMIT:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}

export default logModalShow