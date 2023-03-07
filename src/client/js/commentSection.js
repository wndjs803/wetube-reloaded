const { async } = require("regenerator-runtime");

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".deleteBtn");

const handleDelete = async (event) => {
  const li = event.target.parentElement;
  const commentId = li.dataset.id;
  await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  li.remove();
};
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", handleDelete);
});

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const btn = document.createElement("button");
  btn.className = "deleteBtn";
  btn.innerText = "X";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(btn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const videoId = videoContainer.dataset.id;

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
