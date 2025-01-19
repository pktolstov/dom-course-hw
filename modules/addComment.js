import {
    addCommentButton,
    inputNameComment,
    inputCommentField,
    addFormBlock,
} from './constants.js'
import { loadCommentText, listOfComments } from './constants.js'
import { replaceSymbols } from './replaceSymbols.js'
import { getComments } from './renderComments.js'

export const postComment = (commentToApi) => {
    return fetch(
        'https://webdev-hw-api.vercel.app/api/v1/pavel-tolstov/comments',
        {
            method: 'POST',
            body: JSON.stringify(commentToApi),
        },
    )
        .then((response) => {
            if (response.status === 201) {
                return getComments().then(() => {
                    loadCommentText.remove()
                    addFormBlock.style.display = 'flex'
                    inputCommentField.value = ''
                    inputNameComment.value = ''
                })
            } else {
                if (response.status === 400) {
                    throw new Error(
                        'Вы ввели менее трех знаков в комментарии или имени',
                    )
                }
                if (response.status === 500) {
                    postComment(commentToApi)
                }
            }
        })
        .catch((error) => {
            if (error.message === 'Сервер не отвечает') {
                postComment(commentToApi)
            } else if (
                error.message ===
                'Вы ввели менее трех знаков в комментарии или имени'
            ) {
                alert(
                    'Неправильный запрос. Ошибка 404. Вы ввели менее трех знаков в комментарии или имени ',
                )
                return getComments().then(() => {
                    loadCommentText.remove()
                    addFormBlock.style.display = 'flex'
                    if (inputNameComment.value.length <= 2) {
                        inputNameComment.classList.add('add-form-empty')
                    }
                    if (inputNameComment.value.length <= 2) {
                        inputCommentField.classList.add('add-form-empty')
                    }
                })
            }
        })
}
export const addComment = () => {
    addCommentButton.addEventListener('click', (event) => {
        event.stopPropagation()
        inputCommentField.classList.remove('add-form-empty')
        inputNameComment.classList.remove('add-form-empty')
        let commentToApi = {
            name: inputNameComment.value,
            // we don't need specify the date. API does it anyway
            //date: currentDateFormat,
            text: replaceSymbols(inputCommentField.value),
            isliked: false,
            likes: 0,
            forceError: true,
        }
        loadCommentText.textContent = 'Комментарий публикуется...'
        addFormBlock.before(loadCommentText)
        addFormBlock.style.display = 'none'

        postComment(commentToApi)
    })
}
