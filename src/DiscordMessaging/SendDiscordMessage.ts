import { CommandInteraction } from "discord.js";

async function replyToMessages(interaction: CommandInteraction, messageArray: string[]) {
  for (let i = 0; i <= messageArray.length; i++) {
    if (i <= 0) {
      await interaction.reply(messageArray[0]);
    }
    else {
      await interaction.followUp(messageArray[i]);
    }
  }
}

export default async function SendDiscordMessages(interaction: CommandInteraction, messageArray: string[]): Promise<void> {
  try {
    if (messageArray.length < 1) {
      await interaction.reply("Sem Tarefas! 🥳");
    }
    else if (!messageArray) {
      await interaction.reply("Oops! Parece que um erro ocorreu! checa com o adm 😬");
    }

    if (messageArray.length === 1) {
      await interaction.reply(messageArray[0]);
    }
    else {
      await replyToMessages(interaction, messageArray);
    }
  }
  catch (err) {
    console.log(err);
  }
}
