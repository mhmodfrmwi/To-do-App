import { loadFromDataBase, saveToDataBase } from "./dataStorage";
import { renderTaskList } from "./taskUtils";
import { initTaskListener } from "./taskListener";
export const showAllTasks = () => {
  const tasks = loadFromDataBase("tasks");
  renderTaskList(tasks);
  initTaskListener();
  console.log(tasks);
};
export const clearCompletedTask = () => {
  const tasks = loadFromDataBase("tasks");
  const remainingTasks = tasks.filter((task) => !task.completed);
  saveToDataBase("tasks", remainingTasks);
  renderTaskList(remainingTasks);
  initTaskListener();
};

export const showCompletedTask = () => {
  const tasks = loadFromDataBase("tasks");
  const completedTasks = tasks.filter((task) => task.completed);
  renderTaskList(completedTasks);
  initTaskListener();
};

export const showActiveTask = () => {
  const tasks = loadFromDataBase("tasks");
  const activeTasks = tasks.filter((task) => !task.completed);
  renderTaskList(activeTasks);
  initTaskListener();
};
