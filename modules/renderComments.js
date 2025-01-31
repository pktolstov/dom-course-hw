import { initAddLike } from './initListeners.js'
import { initEditComment } from './initListeners.js'
import { listOfComments } from './constants.js'
import { comments, updateComments } from './comments.js'

export const getComments = () => {
    return fetch(
        'https://webdev-hw-api.vercel.app/api/v1/pavel-tolstov/comments',
        {
            method: 'GET',
        },
    )
        .then((response) => {
            if (response.status === 200) {
                return response.json().then((data) => {
                    updateComments(data.comments)
                    renderComments()
                })
            } else {
                {
                    if (response.status === 500) {
                        throw new Error('Сервер недоступен')
                    }
                }
            }
        })
        .catch((error) => {
            if (!navigator.onLine) {
                // Обработка отсутствия интернет-соединения
                alert('Вы оффлайн. Проверьте соединение')
            } else {
                if (error.message === 'Сервер недоступен') {
                    alert(
                        'Сервер недоступен. Ошибка 500. Попробуйте повторить запрос подзднее',
                    )
                }
            }
        })
    // .then((response) => {
    //     return response.json()
    // })
    // .then((data) => {
    //     updateComments(data.comments)
    //     renderComments()
    // })
}

export const renderComments = () => {
    const comentsHtml = comments
        .map((comment, index) => {
            let dateComment = new Date(comment.date)
            let currentDateFormat =
                dateComment.toLocaleDateString('ru-RU') +
                ' ' +
                dateComment.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                })
            return ` <li class="comment" data-index="${index}">
        <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${currentDateFormat}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes" data-index="${index}">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : 'like-button'}" data-index="${index}"></button>
        </div>
      </div>
        </li>`
        })
        .join('')
    listOfComments.innerHTML = comentsHtml
    initAddLike()
    initEditComment()
}
