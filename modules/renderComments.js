import { initAddLike } from './initListeners.js'
import { initEditComment } from './initListeners.js'
import { listOfComments } from './constants.js'
import { comments } from './comments.js'

export const renderComments = () => {
    const comentsHtml = comments
        .map((comment, index) => {
            return ` <li class="comment" data-index="${index}">
        <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes" data-index="${index}">
          <span class="likes-counter">${comment.numberOfLikes}</span>
          <button class="like-button ${comment.islike ? '-active-like' : 'like-button'}" data-index="${index}"></button>
        </div>
      </div>
        </li>`
        })
        .join('')
    listOfComments.innerHTML = comentsHtml
    initAddLike()
    initEditComment()
}
