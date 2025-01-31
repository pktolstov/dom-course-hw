import {
    inputNameComment,
    inputCommentField,
    addFormBlock,
} from './constants.js'
import { loadCommentText} from './constants.js'
//import { replaceSymbols } from './replaceSymbols.js'
import { getComments, renderForm } from './renderComments.js'
import { postApi,loginStatus } from './api.js'

export const postComment = (commentToApi) => {
    return postApi(commentToApi)
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
                    if (loginStatus) {
                        renderForm()
                        if (commentToApi.text.length <= 2) {
                            let inputCommentField = document.querySelector('.add-form-text')
                            inputCommentField.value = commentToApi.text
                            inputCommentField.classList.add('add-form-empty')
                        }
                      }

                })
            }
        })
}
