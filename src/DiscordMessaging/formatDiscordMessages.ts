import { Task } from "../interfaces/Itasks";

interface IMessage {
  name: string;
  description: string;
  date: string;
}

function formattedMessage({ name, description, date }: IMessage): string {
  const message = 
  `\n:white_check_mark: **${name}**  📅 ** A data de vencimento é:**  ${date}\n ${(description.length > 1) ? (`\n**Descrição:** ${description}\n`) : "\n"}`
  
  return message;
}

function countNumberOfCharsInArray(stringArr: string[]) {
  let totalNumberOfChars = 0;

  stringArr.map((message) => {
    totalNumberOfChars += message.length;
  });

  return totalNumberOfChars;
}

function createMessagesMatrix(tasks: Task[]): string[][] {
  const maxNumberOfCharsInAMessage = 2000;
  let totalMessagesMatrix: string[][] = [];
  let messageArray: string[] = [];
  
  let numberOfTasks = tasks.length;
  let numberOfTasksIteratedOver = 0;

  
  tasks?.map((task: Task) => {
    const { name, description, dateString } = task;

    const messageToBeAppended = formattedMessage({ name, description, date: dateString });
    const sizeOfMessageToBeAppended = messageToBeAppended.length;

    let totalNumberOfCharsInMessageArray = countNumberOfCharsInArray(messageArray);

    if((totalNumberOfCharsInMessageArray + sizeOfMessageToBeAppended) < maxNumberOfCharsInAMessage){
      messageArray.push(messageToBeAppended);
    }
    else {
      totalMessagesMatrix.push(messageArray);
      messageArray = [];
      messageArray.push(messageToBeAppended);
      totalMessagesMatrix.push(messageArray);
    }

    numberOfTasksIteratedOver++;
    
    if((numberOfTasksIteratedOver === numberOfTasks) && totalMessagesMatrix.length < 1){
      totalMessagesMatrix.push(messageArray);
    }
  });

  return totalMessagesMatrix;
}

function createMessagesArray(tasks: Task[]): string[] {
  const messagesMatrix: string[][] = createMessagesMatrix(tasks);
  const messagesArray: string[] = [];

  
  messagesMatrix.map((messageArr) => {
    const formattedMessage = messageArr.toString().replace(/,/g, "");

    messagesArray.push(formattedMessage);

  });

  return messagesArray;
}

function createMessage(tasks: Task[]): string {
  const messageArray = tasks?.map((task: Task) => {
    const { name, description, dateString } = task;
    return formattedMessage({ name, description, date: dateString });
  });

  const message = messageArray.toString().replace(/,/g, "");
  
  return message;
}




export {createMessage, createMessagesArray }



