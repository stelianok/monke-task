import { Task } from "../interfaces/Itasks";
import { setTasks, todoistTasks } from "../tasks";
import { getTodoistTasks, refreshAPI } from "../todoistAPI";

interface IMessage {
  name: string;
  description: string;
  date: string;
}

function GetDifferenceBetweenTaskArrays(tasks: Task[], oldTasks: Task[]): Task[] {
  const results = tasks.filter(({ name: id1 }) => !oldTasks.some(({ name: id2 }) => id2 === id1))

  return results;
}

async function CheckIfTasksChanged(oldTasks: Task[]) {
  const tasks = await getTodoistTasks();
  const differenceBetweeenTaskArrays = GetDifferenceBetweenTaskArrays(tasks, oldTasks);

  if (differenceBetweeenTaskArrays.length > 0) {
    setTasks(tasks);
    return { newTasks: differenceBetweeenTaskArrays, needsUpdate: true };

  }
  else {
    return { newTasks: differenceBetweeenTaskArrays, needsUpdate: false };
  }
}

function TimeInMinutes(timeInMinutes: number) {
  const timeInMilliseconds = timeInMinutes * 60000;
  return timeInMilliseconds;
}

function formattedMessage({ name, description, date }: IMessage): string {
  const message = `\n:white_check_mark: **${name}**  📅 **A data de vencimento é:** ${date}\n${(description.length > 1) ? (`\n**Descrição:** ${description}\n`) : "\n"}`
  return message;
}

function createMessage(tasks: Task[]): string {
  const messageArray = tasks?.map((task: Task) => {
    const { name, description, date } = task;
    return formattedMessage({ name, description, date });
  });

  const message = messageArray.toString().replace(/,/g, "");
  return message;
}

function notifyNewTasks(client: any) {
  const channel = client.channels.cache.get('864146427176943626');
  const timeId = setInterval(async () => {
    const tasksChanged = await CheckIfTasksChanged(todoistTasks);
    if (tasksChanged.needsUpdate) {
      const message = createMessage(tasksChanged.newTasks);
      channel.send('@🔔・Notificações\n');
      channel.send(`\n:bell: ${tasksChanged.newTasks.length} ** tarefas foram adicionadas ou modificadas: ** \n`);
      channel.send(`\n${message}`);
    }
    await refreshAPI();
  }, TimeInMinutes(15));
  /*
  setTimeout(() => {
    clearInterval(ingreis);
    channel.send("Deu certo man 😎");
  }, TimeInMinutes(5));
  */
}

export { notifyNewTasks }