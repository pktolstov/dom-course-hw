import { getComments } from './modules/renderComments.js'
//import { addComment } from './modules/addComment.js'
import { loadCommentText, listOfComments } from './modules/constants.js'
import { initLoginLink } from './modules/initListeners.js'
import { getApi } from './modules/api.js'

loadCommentText.textContent = 'Комментарии загружаются...'
listOfComments.before(loadCommentText)
getComments().then(() => {
    loadCommentText.remove()
})
initLoginLink()
