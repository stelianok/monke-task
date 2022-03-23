export default async function SendDiscordMessages(interaction: any, messageArray: string[]): Promise<void> {
  if(messageArray.length < 1){
    await interaction.reply("Sem Tarefas! 🥳");
  }
  else if(!messageArray){
    await interaction.reply("Oops! Parece que um erro ocorreu! checa com o adm 😬");
  }

  if(messageArray.length === 1){
    await interaction.reply(messageArray[0]);
  }
  else {
    for(let i = 0; i <= messageArray.length; i++){
      if(i <= 0){
        await interaction.reply(messageArray[0]);
      }
      else {
        await interaction.followUp(messageArray[i]);
      }
    }
  }
}
