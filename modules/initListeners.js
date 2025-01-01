import { comments, updateComments } from './comments.js'
import { renderComments, getComments } from './renderComments.js'
import { inputCommentField } from './constants.js'

export const initAddLike = () => {
    const findLikeButtons = document.querySelectorAll('.like-button')

    for (const like of findLikeButtons) {
        like.addEventListener('click', (event) => {
            event.stopPropagation()
            const commentIndex = like.dataset.index
            let islike = true
            let countLike = 1
            // version with local comments, not with API
            // if (comments[commentIndex].islike) {
            //     islike = false
            //     countLike = -1
            // }
            // comments[commentIndex].islike = islike
            // comments[commentIndex].numberOfLikes += countLike
            // inputCommentField.value = ''

            // version with API
            if (comments[commentIndex].isLiked) {
                islike = false
                countLike = -1
            }
            comments[commentIndex].isLiked = islike
            comments[commentIndex].likes += countLike
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
            commentHtml = ` start### ${comments[commentIndex].author.name}   
        ${comments[commentIndex].text} end###`
            inputCommentField.value = commentHtml
            renderComments()
        })
    }
}
