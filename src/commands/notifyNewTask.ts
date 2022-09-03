import { Client, TextChannel } from "discord.js";
import { createMessage } from "../DiscordMessaging/formatDiscordMessages";
import { ShortTask } from "../interfaces/Itasks";
import { setTasks, todoistTasks } from "../tasks";
import { getTodoistTasks } from "../todoistAPI";


function GetDifferenceBetweenTaskArrays(tasks: ShortTask[], oldTasks: ShortTask[]): ShortTask[] {
  const results = tasks.filter(
    ({ name: newName, date: newDate, description: newDescription }) => (
      !oldTasks.some(({ name: oldName, date: oldDate, description: oldDescription }) => {
        if ((newName === oldName) && (newDate === oldDate) && (newDescription === oldDescription)) {
          return true;
        }
        else {
          return false;
        }
      })
    ));

  return results;
}

async function CheckIfTasksChanged(oldTasks: ShortTask[]) {
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

function sendNotificationMessage(channel: TextChannel, tasks: ShortTask[]) {
  const message = createMessage(tasks);

  //const debugNotificationRoleId = "956155701879799839";
  const notificationRoleId = "864163173712003072";
  channel.send(`<@&${notificationRoleId}>\n`);
  channel.send(`\n:bell: ${tasks.length} ** tarefas foram adicionadas ou modificadas: ** \n`);
  channel.send(`\n${message}`);
}

function notifyNewTasks(client: Client<boolean>) {
  const notificationChannelId = "864146427176943626";
  //const debugNotificationChannelId = "956155530349543474";
  const channel = client.channels.cache.get(notificationChannelId) as TextChannel;

  setInterval(async () => {
    const tasksChanged = await CheckIfTasksChanged(todoistTasks);

    if (tasksChanged.needsUpdate) {
      sendNotificationMessage(channel, tasksChanged.newTasks);
    }

  }, TimeInMinutes(15));
}

export { notifyNewTasks }