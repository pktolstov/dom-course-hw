import {
    addCommentButton,
    inputNameComment,
    inputCommentField,
    addFormBlock,
} from './constants.js'
import { loadCommentText, listOfComments } from './constants.js'
import { replaceSymbols } from './replaceSymbols.js'
import { getComments } from './renderComments.js'

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

        let commentToApi = {
            name: inputNameComment.value,
            // we don't need specify the date. API does it anyway
            //date: currentDateFormat,
            text: replaceSymbols(inputCommentField.value),
            isliked: false,
            likes: 0,
        }
        loadCommentText.textContent = 'Комментарий публикуется...'
        addFormBlock.before(loadCommentText)
        addFormBlock.style.display = 'none'

        fetch(
            'https://webdev-hw-api.vercel.app/api/v1/pavel-tolstov/comments',
            {
                method: 'POST',
                body: JSON.stringify(commentToApi),
            },
        ).then(() => {
            return getComments().then(() => {
                loadCommentText.remove()
                addFormBlock.style.display = 'flex'
                inputCommentField.value = ''
                inputNameComment.value = ''
            })
        })
    })
}
