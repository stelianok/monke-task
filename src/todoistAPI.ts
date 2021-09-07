import axios from 'axios';
import { Task, TodoistTask } from './interfaces/Itasks';

import { TODOIST_TOKEN } from './config/secrets';
//https://api.todoist.com/rest/v1/tasks

const baseURL = 'https://api.todoist.com/rest/v1/tasks';
const project_id = "2273148315";

async function refreshAPI(): Promise<void> {
  try {
    await axios.get('https://polar-dawn-75985.herokuapp.com/');
    console.log('Refreshing Dyno 🍌');
  }
  catch (err) {
    console.log(err);
  }
}

function getFormattedTodoistTasks(todoistTasks: TodoistTask[]): Task[] {
  const tasks: Task[] = todoistTasks.map((task: TodoistTask) => {
    const formattedTask: Task = {
      name: task.content,
      description: task.description,
      date: task.due ? task.due.string : "Sem data definida"
    }
    return formattedTask;
  });

  return tasks;
}

async function getTodoistTasks(): Promise<Task[]> {
  const formattedURL = `${baseURL}?project_id=${project_id}`;

  try {
    const response = await axios.get(formattedURL, {
      headers: {
        "Authorization": `Bearer ${TODOIST_TOKEN}`
      }
    });
    const data = response.data;

    const tasks = getFormattedTodoistTasks(data);

    return tasks;
  }
  catch (err) {
    console.log(err);
    return [];
  }
}

export { getTodoistTasks, refreshAPI }