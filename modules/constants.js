export const addCommentButton = document.querySelector('.add-form-button')
export const inputCommentField = document.querySelector('.add-form-text')
export const inputNameComment = document.querySelector('.add-form-name')
export const listOfComments = document.querySelector('.comments')
export const currentDate = new Date()
export const addFormBlock = document.querySelector('.add-form')
export const mainBlock = document.querySelector('.container')
export const loadCommentText = document.createElement('p')

export function delay(interval = 300) {
    return new Promise((resolve) => {
       setTimeout(() => {
       resolve();
       }, interval);
    });
 }