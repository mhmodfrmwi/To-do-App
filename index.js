import { elements } from "./scripts/elements";
import { loadFromDataBase, saveToDataBase } from "./scripts/dataStorage";
import { toggleDarkTheme } from "./scripts/darkTheme";

import {
  showActiveTask,
  showAllTasks,
  showCompletedTask,
  clearCompletedTask,
} from "./scripts/operationsOnTasks";
import { initTaskListener } from "./scripts/taskListener";
import { addItemToList, renderTaskList } from "./scripts/taskUtils";
elements.themeIcon.addEventListener("click", toggleDarkTheme);

elements.inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const inputValue = elements.inputField.value.trim();
    if (inputValue) {
      addItemToList(inputValue);
      elements.inputField.value = "";
    }
  }
});

const initDataOnStartUp = () => {
  renderTaskList(loadFromDataBase("tasks"));
  initTaskListener();
};

elements.inputFieldCircle.addEventListener("click", () => {
  const inputValue = elements.inputField.value.trim();
  if (inputValue) {
    addItemToList(inputValue);
    elements.inputField.value = "";
  }
});
initDataOnStartUp();
elements.clear.addEventListener("click", () => clearCompletedTask());
elements.completed.addEventListener("click", () => showCompletedTask());
elements.active.addEventListener("click", () => showActiveTask());
elements.all.addEventListener("click", () => showAllTasks());
/* 
[x] See hover states for all interactive elements on the page
[x] Add new todos to the list
[x] Mark todos as complete
[x] Delete todos from the list
[x] Filter by all/active/complete todos
[x] Clear all completed todos
[x] Toggle light and dark mode
[x] **Bonus**: Drag and drop to reorder items on the list

*/
