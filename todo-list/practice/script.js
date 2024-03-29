(function () {
  ("use strict"); // 엄격모드

  const get = (target) => {
    return document.querySelector(target);
  };
  const getAll = (target) => {
    return document.querySelectorAll(target);
  };

  const $todos = get(".todos"); // get 으로 querySelector 잡아주기
  const $form = get(".todo_form");
  const $todoInput = get(".todo_input");
  const $pagination = get(".pagination");
  const API_URL = `http://localhost:3000/todos`;

  let currentPage = 1;
  const totalCount = 12;
  const pageCount = 3;
  const limit = 5;

  const pagination = () => {
    let totalPage = Math.ceil(totalCount / limit);
    let pageGroup = Math.ceil(currentPage / pageCount);
    let lastNumber = pageGroup * pageCount;
    if (lastNumber > totalPage) {
      lastNumber = totalPage;
    }
    let firstNumber = lastNumber - (pageCount - 1);

    const next = lastNumber + 1;
    const prev = firstNumber - 1;

    let html = "";

    if (prev > 0) {
      html += "<button class='prev' data-fn='prev'>이전</button> ";
    }

    for (let i = firstNumber; i <= lastNumber; i++) {
      html += `<button class="pageNumber" id="page_${i}">${i}</button>`;
    }
    if (lastNumber < totalPage) {
      html += `<button class='next' data-fn='next'>다음</button>`;
    }

    $pagination.innerHTML = html;
    const $currentPageNumber = get(`.pageNumber#page_${currentPage}`);
    $currentPageNumber.style.color = "#9dc0e8";

    const $currentPageNumbers = getAll(`.pagination button`);
    $currentPageNumbers.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.fn === "prev") {
          currentPage = prev;
        } else if (button.dataset.fn === "next") {
          currentPage = next;
        } else {
          currentPage = button.innerText;
        }
        pagination();
        getTodos();
      });
    });
  };

  const createTodoElement = (item) => {
    const { id, content, completed } = item;
    const isChecked = completed ? "checked" : "";
    const $todoItem = document.createElement("div");
    $todoItem.classList.add("item");
    $todoItem.dataset.id = id;
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' 
                ${isChecked}
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `;
    return $todoItem;
  };

  // READ
  const renderAllTodos = (todos) => {
    $todos.innerHTML = ""; // 한번 초기화 해주기 -> 안해주면 페이지네이션 적용 안됨
    todos.forEach((item) => {
      const todoElement = createTodoElement(item); // 태그들 넣어줌
      $todos.appendChild(todoElement); // 적용시킴
    });
  };

  // fetch 데이터 받아서 renderAllTodos 함수 호출해주고 todos 보내줌
  const getTodos = () => {
    fetch(`${API_URL}?_page=${currentPage}&_limit=${limit}`)
      .then((response) => response.json())
      .then((todos) => {
        renderAllTodos(todos);
      })
      .catch((error) => console.error(error.message));
  };

  const addTodo = (e) => {
    e.preventDefault();
    console.log($todoInput.value);
    const todo = {
      content: $todoInput.value,
      completed: false,
    };
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo), // 그냥 냅다 $todoInput.value 주면 안되고 데이터 받는 형식에 맞게!
    })
      .then(getTodos)
      .then(() => {
        $todoInput.focus();
      })
      .catch((error) => console.log(error));
  };

  const removeTodo = (e) => {
    if (e.target.className !== "todo_remove_button") return;
    console.log(e.target);
    const $item = e.target.closest(".item");
    const id = $item.dataset.id; //dataset 은 html element에서만 가져올 수 있나봐

    console.log(id);
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message));
  };

  // $todos를 클릭했을때 그 타겟이 todo_checkbox일때를 찾아야 함
  // 현재 $todos는 리스트 전체이기 때문에 !
  // 체크박스를 클릭했을때 item 이 잡혀야 하는데
  // 그중 가장  가까운 (해당하는) item을 찾기 위해서 closest 메서드를 활용한다!
  const toggleTodo = (e) => {
    if (e.target.className !== "todo_checkbox") return;
    const $item = e.target.closest(".item");
    console.log($item);
    const id = $item.dataset.id; //dataset 은 html element에서만 가져올 수 있나봐
    console.log(id);
    const completed = e.target.checked;
    console.log(completed);

    fetch(`${API_URL}/${id}`, {
      method: "PATCH", //PUT은 전체교체, PATCH는 부분 교체
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message));
  };

  const changeEditMode = (e) => {
    const $item = e.target.closest(".item");
    const $label = $item.querySelector("label");
    const $editInput = $item.querySelector('input[type="text"]');
    const $contentButtons = $item.querySelector(".content_buttons");
    const $editButtons = $item.querySelector(".edit_buttons");
    const value = $editInput.value;

    if (e.target.className === "todo_edit_button") {
      $label.style.display = "none";
      $editInput.style.display = "block";
      $contentButtons.style.display = "none";
      $editButtons.style.display = "block";
      $editInput.focus(); // 그냥 포커스만 하면 작성되어있는 텍스트 가장 앞쪽에 포커스됨
      $editInput.value = "";
      $editInput.value = value;
    }

    if (e.target.className === "todo_edit_cancel_button") {
      $label.style.display = "block";
      $editInput.style.display = "none";
      $contentButtons.style.display = "block";
      $editButtons.style.display = "none";
      $editInput.value = $label.innerText;
    }
  };

  const editTodo = (e) => {
    // 특정 id 가져와서 수정해야함
    if (e.target.className !== "todo_edit_confirm_button") return; //className이 아닐때임 !
    const $item = e.target.closest(".item");
    const id = $item.dataset.id;
    const $editInput = $item.querySelector('input[type="text"]');
    const content = $editInput.value;

    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message));
  };

  const init = () => {
    window.addEventListener("DOMContentLoaded", () => {
      getTodos();
      pagination();
    });

    $form.addEventListener("submit", addTodo);
    $todos.addEventListener("click", toggleTodo);
    $todos.addEventListener("click", changeEditMode);
    $todos.addEventListener("click", editTodo);
    $todos.addEventListener("click", removeTodo);
  };

  init();
})();
