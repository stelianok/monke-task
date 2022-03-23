import { Client, TextChannel } from "discord.js";
import { createMessage } from "../DiscordMessaging/formatDiscordMessages";
import { Task } from "../interfaces/Itasks";
import { setTasks, todoistTasks } from "../tasks";
import { getTodoistTasks } from "../todoistAPI";


function GetDifferenceBetweenTaskArrays(tasks: Task[], oldTasks: Task[]): Task[] {
  const results = tasks.filter(({ name: id1 }) => !oldTasks.some(({ name: id2 }) => id2 === id1))

  return results;
}

async function CheckIfTasksChanged(oldTasks: Task[]) {
  const tasks = await getTodoistTasks('');
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

function notifyNewTasks(client: Client<boolean>) {
  const channel = client.channels.cache.get('864146427176943626');

  setInterval(async () => {
    const tasksChanged = await CheckIfTasksChanged(todoistTasks);
    if (tasksChanged.needsUpdate) {
      const message = createMessage(tasksChanged.newTasks);
      (channel as TextChannel).send('<@&864163173712003072>\n');
      (channel as TextChannel).send(`\n:bell: ${tasksChanged.newTasks.length} ** tarefas foram adicionadas ou modificadas: ** \n`);
      (channel as TextChannel).send(`\n${message}`);
    }
  }, TimeInMinutes(15));
}

export { notifyNewTasks }