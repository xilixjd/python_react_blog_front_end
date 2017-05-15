import {combineReducers} from 'redux';
import  postIssues from './postIssues.js'
import comments from './comments.js'
import getABlog from './getABlog.js'
import getTags from './getTags.js'
import isLoggedIn from './isLoggedIn.js'
import logModalShow from './logModalShow.js'
import messages from './messages.js'
import mentions from './mentions.js'
import imgs from './imgs.js'
import infoMessage from './infoMessage.js'


const rootReducer = combineReducers({
    comments,
    postIssues,
    getABlog,
    getTags,
    isLoggedIn,
    logModalShow,
    messages,
    mentions,
    imgs,
    infoMessage
})

export default rootReducer
