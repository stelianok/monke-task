import { Interaction } from "discord.js";

import { createMessage } from "../DiscordMessaging/formatDiscordMessages"
import SendDiscordMessage from "../DiscordMessaging/SendDiscordMessage";

import { Task } from "../interfaces/Itasks";
import { getTodoistTasks } from "../todoistAPI";

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