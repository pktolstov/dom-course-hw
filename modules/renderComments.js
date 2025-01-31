import { initAddLike } from './initListeners.js'
import { initEditComment } from './initListeners.js'
import {
    listOfComments,
    loginPage,
    registrationPage,
    commentForm,
    loadCommentText,
    loginLink,
} from './constants.js'
import { comments, updateComments } from './comments.js'
import { getApi, userName,loginStatus, updateLoginStatus } from './api.js'
import { replaceSymbols } from './replaceSymbols.js'
import { postComment } from './addComment.js'

export const getComments = () => {
    return getApi()
        .then((response) => {
            if (response.status === 200) {
                return response.json().then((data) => {
                    updateComments(data.comments)
                    renderComments()
                    console.log(loginStatus);
                    if (loginStatus) {
                        renderForm()
                      }
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
        }).finally(error => {

        })
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

export const renderLogin = () => {
    loginPage.innerHTML = `
  <div class="add-form">
  <input
      type="text"
      class="add-login-name"
      placeholder="Введите логин"
  />
  <input
      type="text"
      class="add-login-name"
      placeholder="Введите пароль"
      rows="4"
  ></input>
  <div class="add-form-row">
      <button id="login-button" class="add-form-button">Войти</button>
  </div>
  `
}

export const renderReg = () => {
    registrationPage.innerHTML = `
    <div class="add-form">
      <input
        type="text"
        class="add-login-name"
        placeholder="Введите Имя"
      />
      <input
        type="text"
        class="add-login-name"
        placeholder="Введите логин"
        rows="4"
      ></input>
      <input
        type="text"
        class="add-login-name"
        placeholder="Введите пароль"
        rows="4"
      ></input>
      <div class="add-form-row">
        <button class="add-form-button">Регистрация</button>
      </div>
    </div>
  `
}

export const renderForm = () => {
    loginLink.remove(loginLink)
    commentForm.innerHTML = `
    <div id="user-comment" class="add-form">
      <p
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя">${userName}
      </p>
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="publish-button" class="add-form-button">Написать</button>
      </div>
    </div>
  `
    let publishButton = document.getElementById('publish-button')

    publishButton.addEventListener('click', (event) => {
        event.stopPropagation()
        let inputCommentField = document.querySelector('.add-form-text')
        let addFormBlock = document.querySelector('.add-form')
        inputCommentField.classList.remove('add-form-empty')
        //inputNameComment.classList.remove('add-form-empty')
        let commentToApi = {
            //name: inputNameComment.value,
            // we don't need specify the date. API does it anyway
            //date: currentDateFormat,
            text: replaceSymbols(inputCommentField.value),
            //isliked: false,
            //likes: 0,
            //forceError: true,
        }
        loadCommentText.textContent = 'Комментарий публикуется...'
        addFormBlock.before(loadCommentText)
        addFormBlock.style.display = 'none'
        postComment(commentToApi)
    })
}
