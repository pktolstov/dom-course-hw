import { comments } from './comments.js'
import { getComments, renderComments } from './renderComments.js'
import { inputCommentField, delay } from './constants.js'

export const initAddLike = () => {
    const findLikeButtons = document.querySelectorAll('.like-button')

    for (const like of findLikeButtons) {
        like.addEventListener('click', (event) => {
            event.stopPropagation()
            const commentIndex = like.dataset.index
            let islike = true
            let countLike = 1

            // version with API
            if (comments[commentIndex].isLiked) {
                islike = false
                countLike = -1
            }
            like.classList.add('-loading-like')
            delay(2000).then(() => {
                comments[commentIndex].isLiked = islike
                comments[commentIndex].likes += countLike
                renderComments()
                inputCommentField.value = ''
            }) 
        })
    }
}

export const initEditComment = () => {
    const findAllComments = document.querySelectorAll('.comment')
    for (const comment of findAllComments) {
        comment.addEventListener('click', (event) => {
            event.stopPropagation()
            const commentIndex = comment.dataset.index
            let commentHtml = ''
            commentHtml = ` start### ${comments[commentIndex].author.name}   
        ${comments[commentIndex].text} end###`
            inputCommentField.value = commentHtml
            getComments()
        })
    }
}
