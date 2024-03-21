import { elements } from "./elements";

export const draggingHandler = (e) => {
  const draggingElement = document.querySelector(".dragging");
  const elementExceptDraggingIte = [
    ...elements.ulElement.querySelectorAll(".list__item:not(.dragging)"),
  ];
  let nextItem = elementExceptDraggingIte.find((element) => {
    return e.clientY <= element.offsetTop + element.offsetHeight / 2;
  });
  elements.ulElement.insertBefore(draggingElement, nextItem);
};
