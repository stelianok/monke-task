
import { Client, Intents } from 'discord.js';
import { token } from '../config.json';
import { GetAllTasks } from './commands/getAllTasks';
import { notifyNewTasks } from './commands/notifyNewTask';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Monke on 🐒😎🤏');
});

client.on('ready', () => notifyNewTasks(client));

client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'tarefas') {
    await GetAllTasks(interaction);
  } else if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});

client.login(token);

