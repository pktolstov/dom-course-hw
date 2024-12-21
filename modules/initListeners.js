import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { inputCommentField } from './constants.js'

export const initAddLike = () => {
    const findLikeButtons = document.querySelectorAll('.like-button')

    for (const like of findLikeButtons) {
        like.addEventListener('click', (event) => {
            event.stopPropagation()
            const commentIndex = like.dataset.index
            let islike = true
            let countLike = 1
            if (comments[commentIndex].islike) {
                islike = false
                countLike = -1
            }
            comments[commentIndex].islike = islike
            comments[commentIndex].numberOfLikes += countLike
            inputCommentField.value = ''

            renderComments()
        })
    }
}

export const initEditComment = () => {
    const findAllComments = document.querySelectorAll('.comment')
    //console.log(findAllComments);
    for (const comment of findAllComments) {
        comment.addEventListener('click', (event) => {
            event.stopPropagation()
            const commentIndex = comment.dataset.index
            let commentHtml = ''
            commentHtml = ` start### ${comments[commentIndex].name}   
        ${comments[commentIndex].text} end###`
            inputCommentField.value = commentHtml
            renderComments()
        })
    }
}
