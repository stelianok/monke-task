import { TodoistApi, Task } from '@doist/todoist-api-typescript';
import { ShortTask } from './interfaces/Itasks';

import { TODOIST_TOKEN } from './config/secrets';

let api: TodoistApi;

let projectName = 'DiscordTasks';
let projectId = '2273148315';

let projectDebugName = 'DebugTasks';
let debugProjectId = '2274078148';

loadApi();

async function getTodoistTasks(date?: 'today' | 'tomorrow', guildId?: string): Promise<ShortTask[]> {
  const filter = getFormattedFilter(guildId, date);

  try {
    
    const tasks: Task[] = await api.getTasks({
      filter: filter, 
      projectId: Number.parseInt(projectId) 
    });

    const formattedTasks = formatTodoistTasks(tasks);
    const sortedTasks = sortTodoistTasks(formattedTasks);

    return sortedTasks;
  }
  catch (err) {
    console.log(err);
    return [];
  }
}

function getFormattedFilter(guildId?: string, date?: 'today' | 'tomorrow') {
  /* Filters need to be valid accordingly to these rules: 
     https://todoist.com/help/articles/introduction-to-filters
  */ 
  let filter = `${date} & #${projectName}`;

  if (guildId === '762325895595687947') {
    projectId = debugProjectId;
    filter = `${date} & #${projectDebugName}`;
  }

  if(!date){
    filter = '';
  }

  return filter;
}

function formatTodoistTasks(todoistTasks: Task[]): ShortTask[] {
  const tasks: ShortTask[] = todoistTasks.map((task: Task) => {
    const formattedTask: ShortTask = {
      name: task.content,
      description: task.description,
      dateString: task.due ? task.due.string : "Sem data definida",
      date: task.due ? task.due.date : '',
    }
    return formattedTask;
  });

  return tasks;
}

function sortTodoistTasks(todoistTasks: ShortTask[]): ShortTask[] {
  let sortedTodoistTasks: ShortTask[];
  let tasksWithoutUndefinedDates: ShortTask[];
  let tasksWithUndefinedDates: ShortTask[];

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

function loadApi(){
  if(TODOIST_TOKEN){
    api = new TodoistApi(TODOIST_TOKEN);
  }
  else {
    console.error("TODOIST TOKEN not found");
  }
}

export { getTodoistTasks }