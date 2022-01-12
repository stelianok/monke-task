import { Interaction } from "discord.js";
import { Task } from "../interfaces/Itasks";
import { getTodoistTasks } from "../todoistAPI";

interface IMessage {
  name: string;
  description: string;
  date: string;
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

async function SendDiscordMessage(interaction: any, message?: string): Promise<void> {
  if (message) {
    await interaction.reply(message);
  }
  else {
    await interaction.reply("deu ruim rapaziada KKKKKKK");
  }
}

async function GetAllTasks(interaction: Interaction) {
  try {
    const tasks: Task[] = await getTodoistTasks();

    const message = createMessage(tasks);

    await SendDiscordMessage(interaction, message);
  }
  catch (err) {
    console.log(err);
  }
}

export { GetAllTasks }