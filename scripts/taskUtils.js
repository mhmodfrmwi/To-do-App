import checkImage from "/images/icon-check.svg";
import deleteImage from "/images/icons8-multiply-64.png";
import { elements, circleIconArray } from "./elements";
import { loadFromDataBase, saveToDataBase } from "./dataStorage";
import { initTaskListener } from "./taskListener";
export const toggleTask = (e, index) => {
  const targetElement = e.target.classList.contains("circle")
    ? e.target
    : e.target.parentNode;
  targetElement.classList.toggle("completed");
  const checkIcon = `<img src=${checkImage} class="icon__checked">`;
  targetElement.innerHTML = targetElement.classList.contains("completed")
    ? checkIcon
    : "";
  const tasks = loadFromDataBase("tasks");
  tasks[index].completed = !tasks[index].completed;
  saveToDataBase("tasks", tasks);
};
export const renderTaskList = (tasks) => {
  const darkListItemClass = document.body.classList.contains("darkBody")
    ? " darkListItem"
    : "";
  const taskList = tasks
    .map(
      (task) => `
        <li class="list__item${darkListItemClass}" draggable="true">
          <div class="leftItem">
            <div class="circle${task.completed ? " completed" : ""}">
              ${
                task.completed
                  ? `<img src=${checkImage}  class="icon__checked">`
                  : ""
              }
            </div>
            <p>${task.value}</p>
          </div>
          <div class="rightItem">
            <img src=${deleteImage} class="deleteIcon">
          </div>
        </li>`
    )
    .join("");
  elements.numOfItemsLabel.innerHTML = `${tasks.length} item${
    tasks.length !== 1 ? "s" : ""
  } left`;
  elements.listItems.innerHTML = taskList;
};
export const checkComplete = () => {
  circleIconArray().forEach((item, index) => {
    item.addEventListener("click", (e) => toggleTask(e, index));
  });
};
export const addItemToList = (inputValue) => {
  let tasks = loadFromDataBase("tasks") || [];
  const task = {
    value: inputValue,
    completed: false,
  };
  tasks.push(task);
  saveToDataBase("tasks", tasks);
  renderTaskList(tasks);
  initTaskListener();
};
export const deleteItemFromList = (e, index) => {
  if (!confirm("Are you sure you want to delete?")) {
    return;
  }
  let tasks = loadFromDataBase("tasks");
  tasks.splice(index, 1);
  saveToDataBase("tasks", tasks);
  renderTaskList(tasks);
  initTaskListener();
};
