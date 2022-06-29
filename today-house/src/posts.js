const $postsContainer = document.querySelector(".posting-container"); // document object model 구분하기 위해서 $ 표시함

//db.json을 post로 가져옴 -> data fetch로 가져옴
const post = {};

// url 백틱으로 가져오는 이유가 모지
// axios 가 더 편리함
async function fetchPosts() {
  const response = await fetch(`http://localhost:1234/posts`);
  const data = await response.json();

  return data;
}

const postTemplate = (post) => {
  return `
    <a href="/detail.html?id=${post.id}">
    <div class="posting-wrapper">
      <div class="posting-image-container">
        <img
          src="${post.image}"
          alt="게시글 이미지"
        />
      </div>
      <h2 class="">${post.title}</h2>
      <div class="profile-wrapper">
        <div class="profile-image-container">
          <img
            class="profile-image"
            src="${post.authorImage}"
            alt="profile-image"
          />
        </div>
        <span class="profile-nickname">${post.author}</span>
      </div>
    </div>
  `;
};

fetchPosts().then((posts) => {
  console.log(posts);
  $postsContainer.innerHTML = posts.map((post) => postTemplate(post)).join();
});

// 문자열을 파싱해서 html로 바꿔주는 것 -> innerHTMLpostTemplate
