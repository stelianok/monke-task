import { TodoistApi, Task } from "@doist/todoist-api-typescript";
import { ShortTask } from "./interfaces/Itasks";

import { TODOIST_TOKEN } from "./config/secrets";

let api: TodoistApi;

const projectName = "DiscordTasks";
let projectId = "2273148315";

const projectDebugName = "DebugTasks";
const debugProjectId = "2274078148";

const examsLabel = "Prova";

loadApi();

async function getTodoistTasks(date?: "today" | "tomorrow", guildId?: string): Promise<ShortTask[]> {
  const filter = getFormattedFilter(guildId, date);

  try {
    const tasks: Task[] = await api.getTasks({
      filter: filter,
      projectId: projectId
    });

    const formattedTasks = getUsedAttributesFromTasks(tasks);
    const sortedTasks = sortTodoistTasksByDateInAscendingOrder(formattedTasks);

    return sortedTasks;
  }
  catch (err) {
    console.log(err);
    return [];
  }
}

async function getTodoistExams(guildId?: string): Promise<ShortTask[]> {
  const filter = getFormattedFilter(guildId);

  try {
    const tasks: Task[] = await api.getTasks({
      filter: filter,
      projectId: projectId
    });

    const formattedTasks = getUsedAttributesFromTasks(tasks);

    const sortedTasks = sortTodoistTasksByDateInAscendingOrder(formattedTasks);

    const exams = sortedTasks.filter((task) => {
      return task.labels.includes(examsLabel);
    });

    console.log(exams);

    return exams;
  }
  catch (err) {
    console.log(err);
    return [];
  }
}

function getFormattedFilter(guildId?: string, date?: "today" | "tomorrow") {
  /* Filters need to be valid accordingly to these rules: 
     https://todoist.com/help/articles/introduction-to-filters
  */
  let filter = `${date} & #${projectName}`;

  if (guildId === "762325895595687947") {
    projectId = debugProjectId;
    filter = `${date} & #${projectDebugName}`;
  }

  if (!date) {
    filter = "";
  }

  return filter;
}

function getUsedAttributesFromTasks(todoistTasks: Task[]): ShortTask[] {
  const tasks: ShortTask[] = todoistTasks.map((task: Task) => {
    const formattedTask: ShortTask = {
      name: task.content,
      description: task.description,
      dateString: task.due ? task.due.string : "Sem data definida",
      date: task.due ? task.due.date : "",
      labels: task.labels
    };
    return formattedTask;
  });

  return tasks;
}

function sortTodoistTasksByDateInAscendingOrder(todoistTasks: ShortTask[]): ShortTask[] {
  let sortedTodoistTasks: ShortTask[];
  let tasksWithoutUndefinedDates: ShortTask[];
  let tasksWithUndefinedDates: ShortTask[];

  tasksWithoutUndefinedDates = todoistTasks.filter((task) => {
    return task.date != "";
  });

  tasksWithUndefinedDates = todoistTasks.filter((task) => {
    return task.date == "";
  });

  sortedTodoistTasks = tasksWithoutUndefinedDates.sort((a, b) => {
    return (new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  sortedTodoistTasks.push(...tasksWithUndefinedDates);

  return sortedTodoistTasks;
}

function loadApi() {
  if (TODOIST_TOKEN) {
    api = new TodoistApi(TODOIST_TOKEN);
  }
  else {
    console.error("TODOIST TOKEN not found");
  }
}

export { getTodoistTasks, getTodoistExams };