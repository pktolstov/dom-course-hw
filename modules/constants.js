export const addCommentButton = document.querySelector('.add-form-button')
export const inputCommentField = document.querySelector('.add-form-text')
export const inputNameComment = document.querySelector('.add-form-name')
export const listOfComments = document.querySelector('.comments')
export const currentDate = new Date()
export const addFormBlock = document.querySelector('.add-form')
export const mainBlock = document.querySelector('.container')
export const loadCommentText = document.createElement('p')
export const loginPage = document.getElementById('user-login')
export const registrationPage = document.getElementById('user-registration')
export const commentForm = document.getElementById('user-comment')
export const loginLink = document.getElementById('login-link')
export const loginButton = document.getElementById('login-button')
export const authHost = 'https://wedev-api.sky.pro/api/user'
export const notesHost = 'https://wedev-api.sky.pro/api/v2/pavel-tolstov/comments'
export function delay(interval = 300) {
    return new Promise((resolve) => {
       setTimeout(() => {
       resolve();
       }, interval);
    });
 }
