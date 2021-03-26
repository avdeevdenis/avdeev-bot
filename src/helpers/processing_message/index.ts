/**
 * Маппинг входящего сообщения боту на JS-сущности
 */
 const processingMessage = message => {
  const lowerText = message.text.toLocaleLowerCase();
  const text = message.text;
  const chatId = message.chat.id;
  const username = message.from.username;
  const date = message.date;
  const fromId = message.from.id;

  return {
    lowerText,
    text,
    date,
    username,
    chatId,
    fromId,
  };
}

export default processingMessage;
