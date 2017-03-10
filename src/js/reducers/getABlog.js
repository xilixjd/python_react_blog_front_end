/**
 * Created by xilixjd on 17/3/7.
 */
import { RECEIVE_BLOG } from '../constants/ActionTypes.js'

var defaultIssuesState = {
    isFetching: false,
    blog: {}
}

const getABlog = (state=defaultIssuesState, action) => {
    switch (action.type) {
        case RECEIVE_BLOG:
            return {
                ...state,
                isFetching: false,
                blog: action.blog
            }

        default:
            return state
    }
}

export default getABlog