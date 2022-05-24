import axios from 'axios';
import { Task, TodoistTask } from './interfaces/Itasks';

import { TODOIST_TOKEN } from './config/secrets';
import { query } from 'express';
//https://api.todoist.com/rest/v1/tasks

const baseURL = 'https://api.todoist.com/rest/v1/tasks';

function formatTodoistTasks(todoistTasks: TodoistTask[]): Task[] {
  const tasks: Task[] = todoistTasks.map((task: TodoistTask) => {
    const formattedTask: Task = {
      name: task.content,
      description: task.description,
      dateString: task.due ? task.due.string : "Sem data definida",
      date: task.due ? task.due.date : '',
    }
    return formattedTask;
  });

  return tasks;
}

function sortTodoistTasks(todoistTasks: Task[]): Task[] {
  let sortedTodoistTasks: Task[];
  let tasksWithoutUndefinedDates: Task[];
  let tasksWithUndefinedDates: Task[];

  tasksWithoutUndefinedDates = todoistTasks.filter((task) => {
    return task.date != ''
  })
  
  tasksWithUndefinedDates = todoistTasks.filter((task) => {
    return task.date == ''
  })

  sortedTodoistTasks = tasksWithoutUndefinedDates.sort((a,b) => {
      return (new Date(a.date).getTime() - new Date(b.date).getTime())
  });
  
  sortedTodoistTasks.push(...tasksWithUndefinedDates);
    
  return sortedTodoistTasks;
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
    const data: Array<TodoistTask> = response.data;


    const filteredData = data.filter((task) => {
      return task.project_id.toString() == project_id
    });

    const tasks = formatTodoistTasks(filteredData);
    const sortedTasks = sortTodoistTasks(tasks);

    return sortedTasks;
  }
  catch (err) {
    console.log(err);
    return [];
  }
}

export { getTodoistTasks }