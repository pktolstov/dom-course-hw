import { renderComments, getComments } from './modules/renderComments.js'
import { addComment } from './modules/addComment.js'
import { updateComments } from './modules/comments.js'

// fetch('https://webdev-hw-api.vercel.app/api/v1/gleb-fokin/comments', {
//     method: 'GET',
// })
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         updateComments(data.comments)
//         renderComments()
//     })

getComments()
renderComments()
addComment()
