import { comments } from './comments.js'
import { loginApi, updateToken, updatedName,updateLoginStatus } from './api.js'
import {
    getComments,
    renderComments,
    renderLogin,
    renderForm,
} from './renderComments.js'
import {
    inputCommentField,
    delay,
    loginLink,
    loginButton,
    loginPage,
} from './constants.js'

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

export const initLoginButton = (loginButton) => {
    loginButton.addEventListener('click', (login) => {
        let authData = loginPage.querySelectorAll('.add-login-name')
        let jDate = JSON.stringify({
            login: authData[0].value,
            password: authData[1].value,
        })
        //console.log(jDate);
        loginApi(authData[0].value, authData[1].value).then((data) => {
            updateToken(data.user.token)
            updatedName(data.user.name)
            updateLoginStatus(true)
            loginPage.remove()
            getComments()
            renderForm()
            //console.log(data.user.token)
        })
    })
}

export const initLoginLink = () => {
    loginLink.addEventListener('click', (transition) => {
        renderLogin()
        const loginButton = document.getElementById('login-button')
        initLoginButton(loginButton)
    })
}
