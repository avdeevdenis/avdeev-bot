import consoleLog from '../console_log';

import { ISendResponseOptions } from './typings';

/**
 * Любое сообщение от бота пользователю отправляется строго через этот метод
 * 
 * @param {String} responseOptions.type - тип ответа (message - сообщение, photo - фотография, animation - стикер)
 * @param {Any} responseOptions.data - тело ответа
 * @param {String} responseOptions.chatId - идентификатор чата
 * @param {String} responseOptions.username - логин пользователя
 * @param {Object} responseOptions.AvdeevBot - инстанс бота
 * @param {Object} responseOptions.options - вспомогательные опции, используется для типа 'photo'
 */
const sendResponse = (responseOptions: ISendResponseOptions) => {
  const { type = 'message', data, chatId, username, AvdeevBot, options } = responseOptions;

  if (!data || !chatId || !AvdeevBot) {
    consoleLog('Not enough required params: type `' + type + '` chatId `' + chatId + '` data `' + data + '`');
    return;
  }

  consoleLog('Send response to `' + username + '` with type `' + type + '`');

  switch (type) {
    case 'message': 
      return AvdeevBot.sendMessage(chatId, data);

    case 'photo':
      return AvdeevBot.sendPhoto(chatId, data, options);

    case 'animation':
      return AvdeevBot.sendAnimation(chatId, data);

    default:
      consoleLog('Unknown response type `' + type + '`');
  }
};

export default sendResponse;
