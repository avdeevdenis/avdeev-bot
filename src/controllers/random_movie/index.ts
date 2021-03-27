import { sendRequest } from '../../helpers/send_request';
import processingMessage from '../../helpers/processing_message';
import sendResponse from '../../helpers/send_response';
import { errorLogger } from '../../helpers/loggers';

import {
  getPosterSrc,
  getReponseCaption,
} from './helpers';

const RANDOM_MOVIE_URL = 'https://generator-online.com/api/movies?lang=ru';

/**
 * Отправляет рекомендацию случайного фильма
 */
const controllerRandomMovie = async (message, AvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const response = await sendRequest({
    method: 'POST',
    url: RANDOM_MOVIE_URL,
    headers: {
      'x-requested-with': 'XMLHttpRequest'
    },
  });

  const movieData = (
    response &&
    response.success &&
    response.data &&
    response.data.data &&
    response.data.data.movie &&
    response.data.data.movie.movie
  );

  if (!movieData) {
    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error with get data about random movie.',
    });

    return;
  }

  try {
    /**
     * Подпись к изображению фильма
     */
    const responseCaption = getReponseCaption(movieData);

    /**
     * Изображение фильма
     */
    const posterSrc = getPosterSrc(movieData);

    sendResponse({
      type: 'photo',
      AvdeevBot,
      chatId,
      username,
      data: posterSrc,
      options: { caption: responseCaption, parse_mode: 'MarkdownV2' } // Включаем режим парсинга markdown-сущностей
    });

  } catch (error) {
    errorLogger(error, message);
    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error occurred while sending. Please, try again later.'
    });
  }
};

export default controllerRandomMovie;
