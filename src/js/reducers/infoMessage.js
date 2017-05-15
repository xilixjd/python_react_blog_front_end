
import { REQUEST_SUCCESS, REQUEST_FAIL } from '../constants/ActionTypes.js'

let defaultState = {
    status: 'pending',
    message: '',
    description: ''
}

const infoMessage = (state=defaultState, action) => {
    switch (action.type) {
        case REQUEST_SUCCESS:
            return {
                status: true,
                message: action.message,
                description: action.description
            }
        case REQUEST_FAIL:
            return {
                status: false,
                message: action.message,
                description: action.description
            }
        default:
            return state
    }
}

export default infoMessage