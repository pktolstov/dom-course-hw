import { getComments } from './modules/renderComments.js'
import { addComment } from './modules/addComment.js'
import { loadCommentText, listOfComments } from './modules/constants.js'

loadCommentText.textContent = 'Комментарии загружаются...'
listOfComments.before(loadCommentText)

getComments().then( () => {
    loadCommentText.remove()
})
addComment()
