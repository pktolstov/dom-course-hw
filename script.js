const button = document.getElementById("add");
const list = document.getElementById("list");
const removeButton = document.getElementById("remove");
const input = document.getElementById("field");

const comments = [
    { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto!", islike: false, numberOfLikes: 0 }
];


const initAddLike = () => {
    const findAllComments = document.querySelectorAll(".like");
    for (const comment of findAllComments) {
        comment.addEventListener('click', () => {
            const commentIndex = comment.dataset.index;
            if (comments[commentIndex].islike === false) {
                comments[commentIndex].numberOfLikes += 1;
                comments[commentIndex].islike = true;
                comment.classList.add("svg-class")
                console.log(comment.firstElementChild.firstElementChild.innerHTML = '<image href="img/coolicon_red.svg" height="20px" width="20px" />')
                comment.firstElementChild.firstElementChild.innerHTML = '<image href="img/coolicon_red.svg" height="20px" width="20px" />';
                renderComments();
            } else {
                comments[commentIndex].numberOfLikes -= 1;
                comments[commentIndex].islike = false;
                renderComments();
            };

        })

    }
}

const renderComments = () => {
    const comentsHtml = comments.map((comment, index) => {
        //return `<li><span>${comment.text}</span></br><button  data-index="${index}" class="like">Нравится комментарий (${comment.numberOfLikes})</button></li>`
        return `<li><span>${comment.text}</span></br>
        <div data-index="${index}"class="like">
            <svg data-svg="${index}-svg" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
            <image href="img/coolicon.svg" height="20px" width="20px" />
            </svg><span>${comment.numberOfLikes}</span>
            </div></li>`
    }).join("");
    list.innerHTML = comentsHtml;
    initAddLike();

}

renderComments();








button.addEventListener("click", () => {
    input.classList.remove("error");

    if (input.value === "") {
        input.classList.add("error");
        return;
    }

    comments.push({ text: input.value, islike: false, numberOfLikes: 0 });
    renderComments();

    //   const oldHtml = list.innerHTML;
    //   list.innerHTML = oldHtml + `<li><span>${input.value}</span><button>удалить</button></li>`;
    input.value = "";
});