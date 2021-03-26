const fs = require('fs');

import processingMessage from '../../helpers/processing_message';
import checkFileExists from '../../helpers/check_file_exists';
import getFileCreatedDateCaption from '../../helpers/get_file_created_date_caption';
import sendResponse from '../../helpers/send_response';
import { MOEX_DAY_SCREEN_PATH } from '../../helpers/screen_helpers';

/**
 * Отправляет котировки акции основных компаний из индекса РТС
 */
const controllerScreenMoexDay = async (message, AvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const isExists = await checkFileExists(MOEX_DAY_SCREEN_PATH);

  if (!isExists) {
    sendResponse({
      AvdeevBot,
      username,
      chatId,
      data: 'Sorry can not to find a screen.'
    });
    return;
  }

  const caption = await getFileCreatedDateCaption(MOEX_DAY_SCREEN_PATH);

  sendResponse({
    type: 'photo',
    AvdeevBot,
    chatId,
    username,
    data: fs.createReadStream(MOEX_DAY_SCREEN_PATH),
    options: { caption },
  });
};

export default controllerScreenMoexDay;
