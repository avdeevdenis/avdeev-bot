import consoleLog from '../console_log';
import { errorLogger } from '../loggers';

import { ISendResponseOptions } from './typings';

/**
 * Любое сообщение от бота пользователю отправляется строго через этот метод
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
      return AvdeevBot.sendMessage(chatId, data, options);

    case 'photo':
      return AvdeevBot.sendPhoto(chatId, data, options);

    case 'animation':
      return AvdeevBot.sendAnimation(chatId, data);

    default:
      errorLogger(new Error('Unknown response type `' + type + '`'));
  }
};

export default sendResponse;
