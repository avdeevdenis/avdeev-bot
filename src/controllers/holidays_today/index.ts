import { parse } from 'node-html-parser';

import { sendRequest } from '../../helpers/send_request';
import processingMessage from '../../helpers/processing_message';
import sendResponse from '../../helpers/send_response';
import { errorLogger } from '../../helpers/loggers';
import { IDateOptions } from './typings';
import { IMessage } from '../../typings/IMessage';
import { IAvdeevBot } from '../../typings/IAvdeevBot';

const HOLIDAY_TODAY_URL = 'https://calend.online/holiday/';

/**
 * Отправляет праздники сегодня
 */
const controllerHolidaysToday = async (message: IMessage, AvdeevBot: IAvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const response = await sendRequest({ url: HOLIDAY_TODAY_URL });
  const responseData = response && response.success && response.data;

  if (!responseData) {
    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error with get a data from holiday site.',
    });

    return;
  }

  try {
    const root = parse(responseData.data);
    const listItemNodes = root.querySelectorAll('.holidays-list li');
    const listItemTexts = listItemNodes
      .map(node => '- ' + node.text.trim())
      .filter(onlyUnique)
      .join('\n');

    const beforeText = getTodayDate() + '.\n\n';
    const data = beforeText + listItemTexts;

    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data,
    });
  } catch (error) {
    errorLogger(error, message);

    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error occurred while parsing the nodes.',
    });
  }

  return;
};

function getTodayDate() {
  const options: IDateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZone: 'Europe/Moscow', // important is here
  };

  const locale = 'en-EN'; // and here too
  const date = new Date();

  return date.toLocaleString(locale, options);
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default controllerHolidaysToday;
