/**
 * Created by xilixjd on 17/4/17.
 */

import { RECEIVE_IMGS, REQUEST_IMGS, INIT_IMGS, ADD_IMGS, REQUEST_ADD_IMGS } from '../constants/ActionTypes.js'


const defaultIssuesState = {
    imgs: [],
    pageIdx: 1,
    isFetching: false,
    addFetching: false
}

const imgs = (state=defaultIssuesState, action) => {
    switch (action.type) {
        case REQUEST_IMGS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_IMGS:
            return {
                ...state,
                imgs: action.posts,
                isFetching: false
            }
        case REQUEST_ADD_IMGS:
            return {
                ...state,
                addFetching: true
            }
        case ADD_IMGS:
            let imgs = state.imgs
            imgs = imgs.concat(action.posts)
            return {
                ...state,
                imgs: imgs,
                isFetching: false,
                addFetching: false,
                pageIdx: state.pageIdx + 1
            }
        case INIT_IMGS:
            return {
                ...state,
                imgs: [],
                paging: {
                    pageIdx: 1,
                    quantity: 20
                }
            }
        default:
            return {
                ...state
            }
    }
}


export default imgs