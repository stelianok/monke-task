
import express from 'express';
import { Client,  Interaction, GatewayIntentBits } from 'discord.js';

import { DISCORD_TOKEN } from './config/secrets';

import { GetTasksAndSendMessage } from './commands/getTasksAndSendMessage';
import { notifyNewTasks } from './commands/notifyNewTask';

import { startTasks } from './tasks';

const PORT = process.env.PORT || 5000;

const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

app.use(express.urlencoded({ extended: true }));

app.use('/', (request, response) => {
  return response.sendStatus(200);
});

startTasks();

client.once('ready', async () => {
  console.log('Monke on 🐒😎🤏');
  console.log(process.env.NODE_ENV);
});

client.on('ready', async () => {
  notifyNewTasks(client);
});

 
client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  
  if (commandName === 'tarefas') {
    if(interaction.options.getSubcommand() === 'totais'){
      await GetTasksAndSendMessage(interaction);
    }
    else if(interaction.options.getSubcommand() === 'hoje'){
      await GetTasksAndSendMessage(interaction, 'today');
    }
    else if(interaction.options.getSubcommand() === 'amanhã'){
      await GetTasksAndSendMessage(interaction, 'tomorrow');
    }
    // await GetTasksAndSendMessage(interaction);
  }
  
});

client.login(DISCORD_TOKEN);

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));