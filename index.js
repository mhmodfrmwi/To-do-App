const elements = {
  topScreen: document.querySelector(".top"),
  themeIcon: document.querySelector(".theme__icon"),
  listItems: document.querySelector(".list__items"),
  secondUl: document.querySelector(".second__ul"),
  bottomContent: document.querySelector(".bottom__content"),
  inputField: document.querySelector(".input__field"),
  numOfItemsLabel: document.querySelector(".item"),
  clear: document.querySelector(".clear"),
  completed: document.querySelector(".show__completed"),
  active: document.querySelector(".show__active"),
  all: document.querySelector(".show__all"),
  inputFieldCircle: document.querySelector(".circleInputField"),
};

const listItemArray = () => document.querySelectorAll(".list__item");
const circleIconArray = () => document.querySelectorAll(".circle");
const getDeleteIcons = () => document.querySelectorAll(".deleteIcon");

const saveToDataBase = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromDataBase = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data) || [];
};

const toggleDarkTheme = () => {
  elements.topScreen.classList.toggle("darkTop");
  document.body.classList.toggle("darkBody");
  elements.listItems.classList.toggle("darkList");
  elements.secondUl.classList.toggle("darkList");
  elements.bottomContent.classList.toggle("darkBottomContent");
  elements.inputField.classList.toggle("darkInputField");
  elements.themeIcon.src = document.body.classList.contains("darkBody")
    ? "images/icon-moon.svg"
    : "images/icon-sun.svg";
  listItemArray().forEach((item) => item?.classList.toggle("darkListItem"));
  saveToDataBase("darkModeFlag", document.body.classList.contains("darkBody"));
};

elements.themeIcon.addEventListener("click", toggleDarkTheme);

const toggleTask = (e, index) => {
  const targetElement = e.target.classList.contains("circle")
    ? e.target
    : e.target.parentNode;
  targetElement.classList.toggle("completed");
  const checkIcon = `<img src='images/icon-check.svg' class="icon__checked">`;
  targetElement.innerHTML = targetElement.classList.contains("completed")
    ? checkIcon
    : "";
  const tasks = loadFromDataBase("tasks");
  tasks[index].completed = !tasks[index].completed;
  saveToDataBase("tasks", tasks);
};

const checkComplete = () => {
  circleIconArray().forEach((item, index) => {
    item.addEventListener("click", (e) => toggleTask(e, index));
  });
};

const renderTaskList = (tasks) => {
  const darkListItemClass = document.body.classList.contains("darkBody")
    ? " darkListItem"
    : "";
  const taskList = tasks
    .map(
      (task) => `
      <li class="list__item${darkListItemClass}">
        <div class="leftItem">
          <div class="circle${task.completed ? " completed" : ""}">
            ${
              task.completed
                ? '<img src="images/icon-check.svg" class="icon__checked">'
                : ""
            }
          </div>
          <p>${task.value}</p>
        </div>
        <div class="rightItem">
          <img src="images/icons8-multiply-64.png" class="deleteIcon">
        </div>
      </li>`
    )
    .join("");
  elements.numOfItemsLabel.innerHTML = `${tasks.length} item${
    tasks.length !== 1 ? "s" : ""
  } left`;
  elements.listItems.innerHTML = taskList;
};

const initTaskListener = () => {
  checkComplete();
  getDeleteIcons().forEach((item, index) => {
    item.addEventListener("click", (e) => deleteItemFromList(e, index));
  });
};

const addItemToList = (inputValue) => {
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

elements.inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const inputValue = elements.inputField.value.trim();
    if (inputValue) {
      addItemToList(inputValue);
      elements.inputField.value = "";
    }
  }
});

const deleteItemFromList = (e, index) => {
  if (!confirm("Are you sure you want to delete?")) {
    return;
  }
  let tasks = loadFromDataBase("tasks");
  tasks.splice(index, 1);
  saveToDataBase("tasks", tasks);
  renderTaskList(tasks);
  initTaskListener();
};

const initDataOnStartUp = () => {
  renderTaskList(loadFromDataBase("tasks"));
  initTaskListener();
};
const showAllTasks = () => {
  const tasks = loadFromDataBase("tasks");
  renderTaskList(tasks);
  initTaskListener();
  console.log(tasks);
};
const clearCompletedTask = () => {
  const tasks = loadFromDataBase("tasks");
  const remainingTasks = tasks.filter((task) => !task.completed);
  saveToDataBase("tasks", remainingTasks);
  renderTaskList(remainingTasks);
  initTaskListener();
};

const showCompletedTask = () => {
  const tasks = loadFromDataBase("tasks");
  const completedTasks = tasks.filter((task) => task.completed);
  renderTaskList(completedTasks);
  initTaskListener();
};

const showActiveTask = () => {
  const tasks = loadFromDataBase("tasks");
  const activeTasks = tasks.filter((task) => !task.completed);
  renderTaskList(activeTasks);
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
[ ] View the optimal layout for the app depending on their device's screen size
[ ] See hover states for all interactive elements on the page
[ ] Add new todos to the list
[ ] Mark todos as complete
[ ] Delete todos from the list
[ ] Filter by all/active/complete todos
[ ] Clear all completed todos
[ ] Toggle light and dark mode
[ ] **Bonus**: Drag and drop to reorder items on the list

*/
