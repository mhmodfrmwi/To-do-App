import { elements, getDeleteIcons, listItemArray } from "./elements";
import { checkComplete } from "./taskUtils";
import { draggingHandler } from "./draggingTask";
import { deleteItemFromList } from "./taskUtils";

export const initTaskListener = () => {
  checkComplete();
  getDeleteIcons().forEach((item, index) => {
    item.addEventListener("click", (e) => deleteItemFromList(e, index));
  });
  listItemArray().forEach((item) => {
    item.addEventListener("dragstart", () => {
      setTimeout(() => item.classList.add("dragging"), 0);
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
  });
  elements.ulElement.addEventListener("dragover", draggingHandler);
};
