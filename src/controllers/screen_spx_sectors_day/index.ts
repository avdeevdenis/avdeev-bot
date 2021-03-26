const fs = require('fs');

import processingMessage from '../../helpers/processing_message';
import checkFileExists from '../../helpers/check_file_exists';
import getFileCreatedDateCaption from '../../helpers/get_file_created_date_caption';
import sendResponse from '../../helpers/send_response';
import { SPX_SECTORS_DAY_SCREEN_PATH } from '../../helpers/screen_helpers';

/**
 * Отправляет котировки акции основных компаний из индекса SPX с разбивкой по секторам
 */
const controllerScreenSpxSectorsDay = async (message, AvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const isExists = await checkFileExists(SPX_SECTORS_DAY_SCREEN_PATH);

  if (!isExists) {
    sendResponse({
      AvdeevBot,
      chatId,
      username,
      data: 'Sorry can not to find a screen.',
    });
    return;
  }

  const caption = await getFileCreatedDateCaption(SPX_SECTORS_DAY_SCREEN_PATH);

  sendResponse({
    type: 'photo',
    AvdeevBot,
    chatId,
    username,
    data: fs.createReadStream(SPX_SECTORS_DAY_SCREEN_PATH),
    options: { caption }
  });
};

export default controllerScreenSpxSectorsDay;
