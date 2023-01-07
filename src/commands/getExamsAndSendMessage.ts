import { CommandInteraction } from "discord.js";

import { createMessagesArray } from "../DiscordMessaging/formatDiscordMessages";
import SendDiscordMessage from "../DiscordMessaging/SendDiscordMessage";

import { ShortTask } from "../interfaces/Itasks";
import { getTodoistExams } from "../todoistAPI";

async function getExamsAndSendMessage(interaction: CommandInteraction) {
  try {
    const tasks: ShortTask[] = await getTodoistExams(interaction.guild?.id);

    const messages = createMessagesArray(tasks);

    await SendDiscordMessage(interaction, messages);
  }
  catch (err) {
    console.log(err);
  }
}

export { getExamsAndSendMessage };