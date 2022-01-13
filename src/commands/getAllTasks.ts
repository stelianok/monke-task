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

function separateLargerMessages(message: string, size: number) {
  const numberOfMessages = Math.ceil(message.length / size);
  const messagesArray = new Array(numberOfMessages);

  for (let i = 0, o = 0; i < numberOfMessages; ++i, o += size) {
    messagesArray[i] = message.substring(o, size)
  }
  return messagesArray;
}
async function SendDiscordMessage(interaction: any, message: string): Promise<void> {

  if (message) {
    if (message.length > 2000) {
      const messageArray = separateLargerMessages(message, 2000);

      console.log(messageArray.length);
      console.log(messageArray);
      messageArray.map(async (message) => {
        if (message.length > 0) {
          await interaction.reply(message);
        }
      });
    }
    else {
      await interaction.reply(message);
    }
  }
  else {
    await interaction.reply("deu ruim rapaziada KKKKKKK");
  }
}

async function GetAllTasks(interaction: Interaction) {
  try {


    const tasks: Task[] = await getTodoistTasks(interaction.guild?.id);

    const message = createMessage(tasks);

    await SendDiscordMessage(interaction, message);
  }
  catch (err) {
    console.log(err);
  }
}

export { GetAllTasks }