import { ShortTask } from "./interfaces/Itasks";
import { getTodoistTasks } from "./todoistAPI";

let todoistTasks: ShortTask[];

function startTasks() {
  getTodoistTasks().then((response) => {
    todoistTasks = response;
  }).catch((err) => {
    console.log(err);
    return [];
  });
}

function setTasks(newTaskArray: ShortTask[]) {
  todoistTasks = newTaskArray;
}

export { todoistTasks, startTasks, setTasks };