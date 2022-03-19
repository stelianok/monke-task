import { Interaction } from "discord.js";

import { createMessagesArray } from "../DiscordMessaging/formatDiscordMessages"
import SendDiscordMessage from "../DiscordMessaging/SendDiscordMessage";

import { Task } from "../interfaces/Itasks";
import { getTodoistTasks } from "../todoistAPI";

async function GetAllTasks(interaction: Interaction) {
  try {
    const tasks: Task[] = await getTodoistTasks(interaction.guild?.id);

    const messages = createMessagesArray(tasks);
    
    await SendDiscordMessage(interaction, messages);
  }
  catch (err) {
    console.log(err);
  }
}

export { GetAllTasks }