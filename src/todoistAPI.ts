import axios from 'axios';
import { Task, TodoistTask } from './interfaces/Itasks';

import { TODOIST_TOKEN } from './config/secrets';
import { query } from 'express';
//https://api.todoist.com/rest/v1/tasks

const baseURL = 'https://api.todoist.com/rest/v1/tasks';



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

async function getTodoistTasks(filter: string, guildId?: string): Promise<Task[]> {
  let project_id = '2273148315';

  if (guildId === '762325895595687947') {
    project_id = '2274078148';
  }

  try {
    const response = await axios.get(baseURL, {
      headers: {
        "Authorization": `Bearer ${TODOIST_TOKEN}`
      },
      params: {
        project_id: project_id,
        filter: filter
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

export { getTodoistTasks }