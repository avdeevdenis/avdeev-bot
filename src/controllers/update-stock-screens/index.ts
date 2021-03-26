import processingMessage from '../../helpers/processing_message';
import updateStockScreens from './update_stock_screens_helper';
import sendResponse from '../../helpers/send_response';

/**
 * Обновляет скрины сайтов, где расположены необходимые котировки акции
 */
const controllerUpdateStockScreens = async (message, AvdeevBot) => {
  const { chatId, username } = processingMessage(message);

  const { isUpdatedSuccessfully, isLoading } = await updateStockScreens();

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
