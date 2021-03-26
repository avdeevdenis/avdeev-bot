import sendRequest from '../../helpers/send_request';
import processingMessage from '../../helpers/processing_message';
import sendResponse from '../../helpers/send_response';

const apiKey = process.env.AVDEEV_BOT_GIPHY_API_KEY;

/**
 * Отправляет случайную гифку котика
 */
const controllerRandomCat = async (message, AvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const url = 'https://api.giphy.com/v1/gifs/random' +
    '?api_key=' + apiKey +
    '&tag=cats';

  const response = await sendRequest(url);
  const responseData = response && response.success && response.data;

  if (!responseData) {
    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error with get source image from server.',
    });

    return;
  }

  const gifUrl = (
    responseData.data &&
    responseData.data.data &&
    responseData.data.data.image_original_url
  );

  if (!gifUrl) {
    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'An error with get source image from data.',
    });

    return;
  }

  sendResponse({
    type: 'animation',
    AvdeevBot,
    chatId,
    username,
    data: gifUrl
  });
};

export default controllerRandomCat;
