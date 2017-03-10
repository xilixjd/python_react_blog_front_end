import {combineReducers} from 'redux';
import  postIssues from './postIssues.js'
import comments from './comments.js'
import getABlog from './getABlog.js'
import getTags from './getTags.js'
import isLoggedIn from './isLoggedIn.js'
import logModalShow from './logModalShow.js'


const rootReducer = combineReducers({
    comments,
    postIssues,
    getABlog,
    getTags,
    isLoggedIn,
    logModalShow
})

export default rootReducer
