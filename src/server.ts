// Init sensitive data
require('dotenv').config();

import AvdeevBot from './helpers/get_bot';

import sendResponse from './helpers/send_response';
import { requestLogger, errorLogger } from './helpers/loggers/index';
import processingMessage from './helpers/processing_message';
import { DDoSProtectLogger, userRequestsInfo } from './helpers/ddos_protect_logger';

import {
  controllerDDoSBlocked,

  controllerRandomCat,
  controllerRandomJoke,
  controllerRandomMovie,

  controllerDefault,

  controllerScreenMoexDay,

  controllerScreenSpxDay,
  controllerScreenSpxSectorsDay,

  controllerUpdateStockScreens,
  controllerHolidaysToday,
} from './controllers/all';
import { IMessage } from './typings/IMessage';
import { IAvdeevBot } from './typings/IAvdeevBot';

/**
 * Обрабатываем поступающие сообщения от пользователей
 */
const onGetMessage = async function (message: IMessage) {
  const { lowerText, fromId } = processingMessage(message);

  const isBlockedByDDoS = (
    userRequestsInfo[fromId] &&
    userRequestsInfo[fromId].isBlockedByDDoS
  );

  if (isBlockedByDDoS) {
    return controllerDDoSBlocked(message, AvdeevBot);
  }

  switch (lowerText) {
    case '/what_holidays_is_today':
      return controllerHolidaysToday(message, AvdeevBot);

    case '/get_random_cat':
      return controllerRandomCat(message, AvdeevBot);

    case '/get_random_joke':
      return controllerRandomJoke(message, AvdeevBot);

    case '/get_random_movie':
      return controllerRandomMovie(message, AvdeevBot);

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
const tryCatcher = async function (onMessage: (message: IMessage) => void, message: IMessage) {
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
const subscribe = (AvdeevBot: IAvdeevBot) => {
  AvdeevBot.on('message', (message: IMessage) => {
    requestLogger(message);
    DDoSProtectLogger(message);

    tryCatcher(onGetMessage, message);
  });

  AvdeevBot.on('polling_error', errorLogger);
  AvdeevBot.on('webhook_error', errorLogger);
};

subscribe(AvdeevBot);
