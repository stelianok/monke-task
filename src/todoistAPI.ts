import axios from 'axios';
import { Task, TodoistTask } from './interfaces/Itasks';

import { TODOIST_TOKEN } from './config/secrets';
//https://api.todoist.com/rest/v1/tasks

const baseURL = 'https://api.todoist.com/rest/v1/tasks';

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

async function getTodoistTasks(guildId?: string): Promise<Task[]> {
  let project_id = '2273148315';

  if (guildId === '762325895595687947') {
    project_id = '2274078148';
  }

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