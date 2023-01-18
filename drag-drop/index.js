const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    });
});


// containers.forEach((container) => {
//     container.addEventListener("dragover", (e) => {
//         // console.log("container", container); // 요소들의 그룹 → 감싸는 요소 (부모)
//         // console.log("e", e.clientX); // 지금 잡고있는 컨테이너의 x 값
//         getDragAfterElement(container, e.clinetX)
//     });
// });

// function getDragAfterElement(container, x) {
//     // .draggable:not(.dragging) → draggable 클래스이면서 dragging이 아닌 요소
//     const draggableElements = [
//         ...container.querySelectorAll(".draggable:not(.dragging)"),
//     ];

//     console.log("draggableElements", draggableElements)
//     console.log(container.querySelectorAll(".draggable:not(.dragging)")) 

// }


containers.forEach(container => {
  container.addEventListener("dragover", e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement === undefined) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, x) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      // console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}
