const $sidebarToggleButton = document.querySelector(".side-bar-toggle");
const $sidebar = document.querySelector(".side-bar");
const $backDrop = document.querySelector(".back-drop");

$sidebarToggleButton.addEventListener("click", () => {
  $sidebar.classList.toggle("open"); // 클래스를 여러개 가질 수 있음 -> open 클래스가 있으면 제거하고 없으면 생성
  $backDrop.style.display = "block"; // 사이드 바 생성됐을 때 -> 배경 어두워짐
});

$backDrop.addEventListener("click", () => {
  // 배경(여백)  클릭했을때
  $sidebar.classList.toggle("open"); // 사이드바 닫고
  $backDrop.style.display = "none"; // 배경 돌아옴
});
