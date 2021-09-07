
import { Client, Intents } from 'discord.js';
import { token } from '../config.json';
import { Task } from './interfaces/Itasks';
import { getTodoistTasks } from './tasks';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Monke on 🐒😎🤏');
});

client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'tarefas') {
    const tasks: Task[] | undefined = await getTodoistTasks();
    const message = tasks?.map((task: Task) => {
      const { name, description, date } = task;
      return (`\n:white_check_mark: **${name}**  📅 **A data de vencimento é:** ${date}\n${(description.length > 1) ? (`\n**Descrição:** ${description}\n`) : "\n"}`);
    });

    if (message) {

      const formattedMessage = message.toString().replace(/,/g, "");
      await interaction.reply(formattedMessage);
    }
    else {
      await interaction.reply("deu ruim rapaziada KKKKKKK");
    }

  } else if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});

client.login(token);

