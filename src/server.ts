// Init sensitive data
require('dotenv').config();

import AvdeevBot from './helpers/get_bot';

import sendResponse from './helpers/send_response';
import { requestLogger, errorLogger } from './helpers/loggers/index';
import processingMessage from './helpers/processing_message';
import consoleLog from './helpers/console_log';

import {
  controllerRandomCat,
  controllerDefault,

  controllerScreenMoexDay,

  controllerScreenSpxDay,
  controllerScreenSpxSectorsDay,

  controllerUpdateStockScreens,
} from './controllers/all';

/**
 * Обрабатываем поступающие сообщения от пользователей
 */
const onGetMessage = async function (message) {
  const { lowerText } = processingMessage(message);

  switch (lowerText) {
    case '/random_cat':
      return controllerRandomCat(message, AvdeevBot);

    case '/moex_day':
      return controllerScreenMoexDay(message, AvdeevBot);

    case '/spx_day':
      return controllerScreenSpxDay(message, AvdeevBot);

    case '/spx_sectors_day':
      return controllerScreenSpxSectorsDay(message, AvdeevBot);

    case '/update_stock_screens':
      return controllerUpdateStockScreens(message, AvdeevBot);

    case '/help':
    default:
      return controllerDefault(message, AvdeevBot);
  }
};

/**
 * Оборачиваем обработку результатов в try catch для обработки гарантированного ответа
 */
const tryCatcher = async function(onMessage, message) {
  const { chatId, username } = processingMessage(message);

  try {
    onMessage.call(this, message);
  } catch (error) {
    await errorLogger(error, message);

    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'Произошла ошибка и где-то плачет один котик.',
    });
  }
};

/**
 * Начинаем слушать события от бота (в основном пришедшие сообщения)
 */
const subscribe = () => {
  AvdeevBot.on('message', message => {
    requestLogger(message);

    tryCatcher(onGetMessage, message);
  });

  AvdeevBot.on('polling_error', error => {
    consoleLog('Polling_error', error);
  });

  AvdeevBot.on('webhook_error', error => {
    consoleLog('Webhook_error', error);
  });
};

subscribe();
