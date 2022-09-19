import { CommandInteraction } from "discord.js";

import { createMessagesArray } from "../DiscordMessaging/formatDiscordMessages";
import SendDiscordMessage from "../DiscordMessaging/SendDiscordMessage";

import { ShortTask } from "../interfaces/Itasks";
import { getTodoistTasks } from "../todoistAPI";

async function GetTasksAndSendMessage(interaction: CommandInteraction, date?: "today" | "tomorrow") {
  try {
    const tasks: ShortTask[] = await getTodoistTasks(date, interaction.guild?.id);

    const messages = createMessagesArray(tasks);

    await SendDiscordMessage(interaction, messages);
  }
  catch (err) {
    console.log(err);
  }
}

export { GetTasksAndSendMessage };