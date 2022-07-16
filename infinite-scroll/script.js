(function () {
  "use strict";

  const get = (target) => {
    return document.querySelector(target);
  };

  let currentPage = 1; // 현재 페이지 (초기값 )지정해주고 콘텐츠 끝나면 늘려줄거얌
  let total = 10; // 1-10까지 보여주고 (보였던! 총 개수) 스크롤 하면 +10 추가
  const limit = 10; // 1. 10개로 제한 걸어줌
  const end = 100; // 총 개수 담아서 제한 걸어줌 , 데이터 끝나면 더이사 로드되지 않게

  const $posts = get(".posts"); // posts 부분 가져아서 append 시켜줌
  const $loader = get(".loader"); // 랜더될때 로딩부분 class 추가해서 애니메이션 줌

  // 로딩중 애니메이션
  const hideLoader = () => {
    $loader.classList.remove("show"); // 로딩애니메이션 -> 클래스 제거해서 보여주지마
  };

  const showLoader = () => {
    $loader.classList.add("show"); // 로딩 애니메이션 -> 클래스 추가해서 보여줘
  };

  // 3. 데이터 보여주기
  const showPosts = (posts) => {
    posts.map((post) => {
      const $post = document.createElement("div");
      $post.classList.add("post");
      // posts에 추가되는 div -> post 하나하나
      $post.innerHTML = ` 
          <div class="header">
            <div class="id">${post.id}.</div>
            <div class="title">${post.title}</div>
          </div>
          <div class="body">${post.body}</div>
      `;
      $posts.appendChild($post); // 적굥 시켜주기
    });
  };

  // 1. 데이터 부르기
  const getPost = async (page, limit) => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      // .ok : 답이 성공했는지(상태 200-299 범위) 여부를 나타내는 부울이 포함됨
      throw new Error("에러가 발생했습니다!"); // 에러 던지기!
    }
    return await response.json();
  };

  // 2. 데이터 로딩하기
  const loadPosts = async (page, limit) => {
    // 행할 코드블럭을 표시하고 예외(exception)가 발생(throw)할 경우의 응답을 지정함
    showLoader(); // class 추가 함수 실행하고 로딩 보여줌 -> 데이터 불러지기 전
    try {
      const response = await getPost(page, limit);
      showPosts(response);
    } catch (error) {
      console.error(error.message);
    } finally {
      //finally 블록은 try 블록과 catch 블록(들)이 실행을 마친 후 항상 실행됨
      hideLoader(); // 위에서 데이터 보여줘서 class 제거함수 실행함
    }
  };

  // 4. 스크로 이벤트 걸어주기
  const handleScroll = () => {
    //Document.documentElement 읽기 전용 속성은 문서의 루트 요소를 나타내는 Element를 반환함
    // 구조분해할당으로 값 받아온건가?
    // <html> = document.documentElement
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (total === end) {
      window.removeEventListener("scroll", handleScroll);
      return; //데이터 다 불러와지면 리턴으로 끝냄 & 스크롤 이벤트 제거함
    }

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // document.documentElement.scrollTop : y 축 방향으로 스크롤한 거리
      // Element.clientHeight은 엘리먼트의 내부 높이를 픽셀로 반환
      // Element.scrollHeight 읽기 전용 속성은 요소 콘텐츠의 총 높이를 나타내며,
      // 바깥으로 넘쳐서 보이지 않는 콘텐츠도 포함
      // 콘텐츠가 스크롤에 닿을때 -> 페이지가 하나씩 늘어야함
      currentPage++;
      total += 10;
      loadPosts(currentPage, limit);
      return;
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    // DOM 이 다 불러질때의 이벤트
    loadPosts(currentPage, limit);
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 발생시
  });
})();
