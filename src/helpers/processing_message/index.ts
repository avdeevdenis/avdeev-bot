/**
 * Маппинг входящего сообщения боту на JS-сущности
 */
 const processingMessage = message => {
  const lowerText = message.text.toLocaleLowerCase();
  const text = message.text;
  const chatId = message.chat.id;
  const username = message.from.username;

  return {
    lowerText,
    text,
    username,
    chatId,
  };
}

export default processingMessage;
