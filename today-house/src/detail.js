// query로 key값 받아와서 불러줄거얌

// url 에서 id 뽑아와야함
// mdn urlSearchParams

const $detailContainer = document.querySelector(".content-container"); //여기 안에 넣어줌
const $coverImage = document.querySelector(".cover-image");
const $postContent = document.querySelector(".post-content");
const $deleteBtn = document.querySelector(".delete-btn"); // 삭제버튼 추가
const today = new Date(); // 현재 날짜를 받아쥬자~

const postId = new URLSearchParams(window.location.search).get("id");
console.log(postId);

function handleDelete(postId) {
  //console.log(posts.id);
  //alert(`글을 삭제합니다.`);
  fetch(`http://localhost:1234/posts/${postId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  //console.log(postId);
  //window.location.assign("/posts.html");
}

$deleteBtn.addEventListener("click", handleDelete);

async function fetchPost(postId) {
  const response = await fetch(`http://localhost:1234/posts/${postId}`); // 호출은 잘되고 넘어가지는 않음
  const data = await response.json();

  return data;
}

fetchPost(postId).then((post) => {
  $coverImage.src = post.image;
  $postContent.innerText = post.content;

  $detailContainer.innerHTML = `<div class="category">온라인 집들이</div>
      <div class="title">${post.title}</div>

      <div class="profile">
        <div class="profile-image-container">
          <img
            src="${post.authorImage}"
            alt="프로필 이미지"
            class="profile-image"
          />
        </div>
        <div class="profile-detail">
          <span class="profile-detail-nickname">${post.author}</span>
          <span class="profile-detail-date">${today.toLocaleString()}</span>
        </div>
      </div>`;
});

// function handleDelete() {
//   console.log("삭제버튼 눌렸다 ");
//   alert(`글을 삭제합니다.`);
//   URLSearchParams.delete(postId);
// }
