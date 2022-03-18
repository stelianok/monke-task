import { Task } from "../interfaces/Itasks";

interface IMessage {
  name: string;
  description: string;
  date: string;
}

function formattedMessage({ name, description, date }: IMessage): string {
  const message = `\n:white_check_mark: **${name}**  📅 **A data de vencimento é:** ${date}\n${(description.length > 1) ? (`\n**Descrição:** ${description}\n`) : "\n"}`
  return message;
}

function createMessage(tasks: Task[]): string {
  const messageArray = tasks?.map((task: Task) => {
    const { name, description, date } = task;
    return formattedMessage({ name, description, date });
  });

  const message = messageArray.toString().replace(/,/g, "");
  return message;
}

function separateLargerMessages(message: string, size: number) {
  const numberOfMessages = Math.ceil(message.length / size);
  const messagesArray = new Array(numberOfMessages);

  for (let i = 0, o = 0; i < numberOfMessages; ++i, o += size) {
    messagesArray[i] = message.substring(o, size)
  }
  return messagesArray;
}


export {createMessage,separateLargerMessages}



