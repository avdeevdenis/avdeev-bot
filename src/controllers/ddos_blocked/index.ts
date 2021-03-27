/**
 * Контроллер, который разово отправляет пользователю сообщение, если его запрос был DDoS
 */
import processingMessage from '../../helpers/processing_message';
import sendResponse from '../../helpers/send_response';
import { userRequestsInfo, UNBLOCK_USER_TIME } from '../../helpers/ddos_protect_logger';
import { IMessage } from '../../typings/IMessage';
import { IAvdeevBot } from '../../typings/IAvdeevBot';

const controllerDDoSBlocked = async (message: IMessage, AvdeevBot: IAvdeevBot) => {
  const { chatId, username, fromId } = processingMessage(message);

  // Отправляем пользователю предупреждение только один раз
  if (userRequestsInfo[fromId].wasSendedDDoSProtectMessage) return;
  userRequestsInfo[fromId].wasSendedDDoSProtectMessage = true;

  const unblockSeconds = UNBLOCK_USER_TIME / 1000;
  const DDoSBlockedMessage = 'Too many requests, try again in ' + unblockSeconds + ' seconds.';

  sendResponse({
    AvdeevBot,
    chatId,
    username,
    data: DDoSBlockedMessage,
  });
};

export default controllerDDoSBlocked;
