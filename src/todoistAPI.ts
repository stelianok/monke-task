import axios from 'axios';
import { todoist_token, project_id } from '../config.json';
import { Task, TodoistTask } from './interfaces/Itasks';

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

async function getTodoistTasks(): Promise<Task[]> {
  const formattedURL = `${baseURL}?project_id=${project_id}`;

  try {
    const response = await axios.get(formattedURL, {
      headers: {
        "Authorization": `Bearer ${todoist_token}`
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