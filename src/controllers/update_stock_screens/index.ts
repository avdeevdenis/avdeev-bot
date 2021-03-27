import processingMessage from '../../helpers/processing_message';
import updateStockScreens from './update_stock_screens_helper';
import sendResponse from '../../helpers/send_response';
import { IMessage } from '../../typings/IMessage';
import { IAvdeevBot } from '../../typings/IAvdeevBot';

/**
 * Обновляет скрины сайтов, где расположены необходимые котировки акции
 */
const controllerUpdateStockScreens = async (message: IMessage, AvdeevBot: IAvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const { isUpdatedSuccessfully, isLoading } = await updateStockScreens(message, AvdeevBot);

  if (isLoading) {
    sendResponse({
      username,
      AvdeevBot,
      chatId,
      data: 'Wait for the information to be updated.',
    });
    return;
  }

  const data = isUpdatedSuccessfully ? 'Screenshots were updated successfully.' : 'An error occurred while updating.';
  const response = {
    AvdeevBot,
    chatId,
    username,
    data,
  }

  sendResponse(response);
};

export default controllerUpdateStockScreens;
