/* eslint @typescript-eslint/no-var-requires: "off" */
const { SlashCommandBuilder,REST, Routes} = require("discord.js");
const { CLIENT_ID, DISCORD_TOKEN } = require("../dist/config/secrets.js");

const commands = [
  new SlashCommandBuilder()
    .setName("tarefas")
    .setDescription("Retorna lista de tarefas")
    .addSubcommand(subcommand =>
      subcommand
        .setName("totais")
        .setDescription("lista todas as tarefas"))
    .addSubcommand(subcommand =>
      subcommand
        .setName("hoje")
        .setDescription("todas as atividades que precisam ser entregues hoje, as 23:59.")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("amanhã")
        .setDescription("todas as atividades que precisam ser entregues amanhã, as 23:59.")
    )
]
  .map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
