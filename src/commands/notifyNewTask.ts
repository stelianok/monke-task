

function CheckIfTasksChanged() {
}

function TimeInMinutes(timeInMinutes: number) {
  const timeInMilliseconds = timeInMinutes * 60000;
  return timeInMilliseconds;
}

function notifyNewTasks(client: any) {
  const channel = client.channels.cache.get('884547408082645062');
  const ingreis = setInterval(() => {
    channel.send("TA TUDO EM INGREIS AAAAA");
  }, TimeInMinutes(30));

  /*
  setTimeout(() => {
    clearInterval(ingreis);
    channel.send("Deu certo man 😎");
  }, TimeInMinutes(5));
  */
}

export { notifyNewTasks }