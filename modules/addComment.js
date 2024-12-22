import { addCommentButton } from './constants.js'
import { inputCommentField } from './constants.js'
import { inputNameComment } from './constants.js'
import { currentDate } from './constants.js'
import { comments } from './comments.js'
import { replaceSymbols } from './replaceSymbols.js'
import { renderComments } from './renderComments.js'

export const addComment = () => {
    addCommentButton.addEventListener('click', (event) => {
        event.stopPropagation()
        inputCommentField.classList.remove('add-form-empty')
        inputNameComment.classList.remove('add-form-empty')

        if (inputNameComment.value === '') {
            inputNameComment.classList.add('add-form-empty')
            return
        }
        if (inputCommentField.value === '') {
            inputCommentField.classList.add('add-form-empty')
            return
        }
        let currentDateFormat =
            currentDate.toLocaleDateString('ru-RU') +
            ' ' +
            currentDate.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            })
        comments.push({
            name: inputNameComment.value,
            date: currentDateFormat,
            text: replaceSymbols(inputCommentField.value),
            islike: false,
            numberOfLikes: 0,
        })
        renderComments()

        inputCommentField.value = ''
        inputNameComment.value = ''
    })
}
