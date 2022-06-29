const $titleInput = document.querySelector(".title-input");
const $authorInput = document.querySelector(".author-input"); // 사용자 닉네임 추가
const $contentInput = document.querySelector(".content-input");
const $titlLength = document.querySelector(".current-title-length");

const $publishButton = document.querySelector(".publish-button");
const $postForm = document.querySelector(".post-form");
const $goBack = document.querySelector(".go-back"); // 뒤로가기

const $coverImage = document.querySelector(".cover-image");
const $imageUpload = document.querySelector("#cover-image-upload");
const $imageReUpload = document.querySelector("#cover-image-re-upload");
const $fileReUpload = document.querySelector(".file-re-upload-wrapper");

function checkInputLength({ target }) {
  if (target.value && target.value.length > 30) {
    alert("30자를 초고한 제목을 입력할 수 없습니다.");
    return;
  }
  $titlLength.innerText = target.value.length; // 0/30 -> 길이 받아옴
}

async function postSubmit(event) {
  // event 를 넘겨주는 이유
  // 폼 자체를 사용할 때 새로고침하면 날라가기 때문에
  // event.preventDefault로 기본 동작을 실행하지 않도록 지정한다.
  event.preventDefault();

  try {
    await fetch(`http://localhost:1234/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: $titleInput.value,
        author: $authorInput.value,
        content: $contentInput.value,
        image: $coverImage.src,
        authorImage: "새로운 유저",
        authorImage:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      }),
    });

    window.location.assign("/posts.html");
  } catch (error) {
    alert(error);
  }
}

function uploadImage(event) {
  // uploadImage 실행되면 event 로 file이 들어오고
  // file을 FileReader API 이용해서 readAsDataURL로 url로 바꿈
  // onload 트리거 event로 잡힘
  // target의 결과를 src 이미지로 집어넣음 (미리보기 이미지)
  const file = event.target.files[0];
  console.log(file);

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (event) => {
    $coverImage.src = event.target.result;
  };
  $coverImage.style.display = "block";
  $fileReUpload.style.display = "block";
}

$imageUpload.addEventListener("change", uploadImage);
$imageReUpload.addEventListener("change", uploadImage);

$titleInput.addEventListener("input", checkInputLength);
$postForm.addEventListener("submit", postSubmit); // 이것만 하면 submit 메서드가 작동하지 않음
$publishButton.addEventListener("click", () => {
  // dispatchEvent 를 통해 submit 이벤트를 호출해야한다!
  $postForm.dispatchEvent(new Event("submit"));
});

$goBack.addEventListener("click", () => {
  window.history.back(1);
});
