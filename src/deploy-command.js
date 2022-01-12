const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { CLIENT_ID, DISCORD_TOKEN } = require('../dist/config/secrets.js');

const guildId = "864141656576098334"
const commands = [
  new SlashCommandBuilder().setName('server').setDescription('Retorna informações sobre o servidor!'),
  new SlashCommandBuilder().setName('user').setDescription('Retorna informações sobre o usuário do comando!'),
  new SlashCommandBuilder().setName('tarefas').setDescription('Retorna lista de tarefas')
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, guildId),
      { body: commands },
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();
