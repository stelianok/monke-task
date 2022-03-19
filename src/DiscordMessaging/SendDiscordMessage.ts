import { Interaction } from "discord.js";

export default async function SendDiscordMessages(interaction: any, messageArray: string[]): Promise<void> {
  if(messageArray.length < 1 || !messageArray){
    await interaction.reply("Um erro ocorreu, não consegui encontrar as mensagens :(");
  }


  if(messageArray.length === 1){
    await interaction.reply(messageArray[0]);
  }
  else {
    for(let i = 0; i <= messageArray.length; i++){
      if(i == 0){
        await interaction.reply(messageArray[0]);
      }
      await interaction.followUp(messageArray[i]);
    }
  }
}
