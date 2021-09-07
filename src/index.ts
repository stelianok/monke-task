
import express from 'express';
import { Client, Intents } from 'discord.js';

import { DISCORD_TOKEN } from './config/secrets';

import { GetAllTasks } from './commands/getAllTasks';
import { notifyNewTasks } from './commands/notifyNewTask';

import { startTasks } from './tasks';

const app = express();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

app.use(express.urlencoded({ extended: true }));

app.use('/', (request, response) => {
  return response.sendStatus(200);
});

startTasks();

client.once('ready', async () => {
  console.log('Monke on 🐒😎🤏');
});

client.on('ready', async () => {
  notifyNewTasks(client);
});

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

client.login(DISCORD_TOKEN);
