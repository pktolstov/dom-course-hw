import { addCommentButton, inputNameComment, inputCommentField } from './constants.js'
import { updateComments } from './comments.js'
import { replaceSymbols } from './replaceSymbols.js'
import { renderComments, getComments } from './renderComments.js'

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

        // Version when local comment storage
        // let currentDateFormat =
        //     currentDate.toLocaleDateString('ru-RU') +
        //     ' ' +
        //     currentDate.toLocaleTimeString('ru-RU', {
        //         hour: '2-digit',
        //         minute: '2-digit',
        //     })

        let commentToApi = {
            name: inputNameComment.value,
            // we don't need specify the date. API does it anyway
            //date: currentDateFormat,
            text: replaceSymbols(inputCommentField.value),
            isliked: false,
            likes: 0,
        }
        fetch('https://webdev-hw-api.vercel.app/api/v1/gleb-fokin/comments', {
            method: 'POST',
            body: JSON.stringify(commentToApi),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                //console.log(data.result)
                updateComments(data.comments)
                getComments()
                //renderComments()
            })
        //console.log(JSON.stringify(commentToApi))
        // comments.push({
        //     name: inputNameComment.value,
        //     date: currentDateFormat,
        //     text: replaceSymbols(inputCommentField.value),
        //     islike: false,
        //     numberOfLikes: 0,
        //})
        renderComments()

        inputCommentField.value = ''
        inputNameComment.value = ''
    })
}
