import { parse } from 'node-html-parser';

import { sendRequest } from '../../helpers/send_request';
import processingMessage from '../../helpers/processing_message';
import sendResponse from '../../helpers/send_response';
import { errorLogger } from '../../helpers/loggers';

const JOKE_SITE_URL = 'https://www.anekdot.ru/random/mem/';

/**
 * Отправляет случайную гифку котика
 */
const controllerRandomJoke = async (message, AvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const response = await sendRequest({ url: JOKE_SITE_URL });
  const responseData = response && response.success && response.data;

  if (!responseData) {
    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error with get a joke from server.',
    });

    return;
  }

  try {
    const root = parse(responseData.data);
    const topicboxNodes = root.querySelectorAll('.topicbox[data-id]');

    let maxVoteCounter = 0;
    let votedJokeSrc = '';

    let anyJokeSrc = ''; // Если не удастся найти самую популярную картинку - отправляем любую

    topicboxNodes.forEach(topicbox => {
      const votes = topicbox.querySelector('.rates').getAttribute('data-r');
      const votePlusCounter = parseInt(votes.split(';')[2]);

      if (!anyJokeSrc) {
        anyJokeSrc = topicbox.querySelector('img')?.getAttribute('src');
      }

      if (votePlusCounter > maxVoteCounter) {
        const imgSrc = topicbox.querySelector('img')?.getAttribute('src');

        if (imgSrc) {
          maxVoteCounter = votePlusCounter;
          votedJokeSrc = imgSrc;
        }
      }
    });

    const CATS_JOKE_SRC = 'https://www.anekdot.ru/i/caricatures/normal/21/2/13/1613203941.jpg';

    const responseImageSrc = votedJokeSrc || anyJokeSrc || CATS_JOKE_SRC;

    sendResponse({
      type: 'photo',
      AvdeevBot,
      chatId,
      username,
      data: responseImageSrc
    });
  } catch (error) {
    errorLogger(error, message);

    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error occurred while processing the image.'
    });
  }
};

export default controllerRandomJoke;
