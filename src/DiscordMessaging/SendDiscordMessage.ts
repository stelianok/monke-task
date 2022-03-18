import { separateLargerMessages } from "./formatDiscordMessages";

export default async function SendDiscordMessage(interaction: any, message: string): Promise<void> {
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
