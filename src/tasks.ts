import { Task } from "./interfaces/Itasks";
import { getTodoistTasks } from "./todoistAPI";


var todoistTasks: Task[];

function startTasks() {
  getTodoistTasks('',).then((response) => {
    todoistTasks = response;
  }).catch((err) => {
    console.log(err);
    return [];
  }); 
}

function setTasks(newTaskArray: Task[]) {
  todoistTasks = newTaskArray;
}

export { todoistTasks, startTasks, setTasks };