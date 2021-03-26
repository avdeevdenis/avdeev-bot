import processingMessage from '../processing_message';
import { IUserRequestsInfo } from './typings';

// Если число запросов больше или равно 'MAX_REQUESTS_LIMIT' - смотрим на время между запросами
const MAX_REQUESTS_LIMIT = 5;

// Если время между запросами меньше, чем 'MAX_REQUESTS_TIME_DIFF' - маркируем запрос, как DDoS
const MAX_REQUESTS_TIME_DIFF = 10;

// Время в мс, по прохождению которого заканчивается блокировка пользователя
export const UNBLOCK_USER_TIME = 10000;

const userRequestsInfo: IUserRequestsInfo = {};

/**
 * Защита от отправки многочисленных сообщений пользователя, общий принцип работы:
 *
 * - если пользователь отправил не менее 'N' сообщений
 * - смотрим на разницу времени отправки последнего и 'N-MAX_REQUESTS_LIMIT' сообщения
 * - если это время меньше, чем 'MAX_REQUESTS_TIME_DIFF' - ставится флажок 'isBlockedByDDoS'
 * - отправляется пользователю разовое сообщение, оповещающее его о том, что он временно заблокирован - ставится флажок 'wasSendedDDoSProtectMessage'
 * - перестаем обрабатывать последующие сообщения пользователя
 * - через 'UNBLOCK_USER_TIME' блокировка снимается
 */
const DDoSProtectLogger = message => {
  const { fromId: userId, date } = processingMessage(message);

  const isBlockedByDDoS = (
    userRequestsInfo[userId] &&
    userRequestsInfo[userId].isBlockedByDDoS
  );

  if (isBlockedByDDoS) return;

  if (!userRequestsInfo[userId]) {
    userRequestsInfo[userId] = {};
  }

  if (!userRequestsInfo[userId].timestamps) {
    userRequestsInfo[userId].timestamps = [];
  }

  const timestamps = userRequestsInfo[userId].timestamps;
  userRequestsInfo[userId].timestamps.push(date);

  // Если число запросов больше 5-ти - начинаем смотреть на время этих запросов
  if (timestamps.length >= MAX_REQUESTS_LIMIT) {
    // Вычисляем разницу между последним запросом (N) и N-5 запросом
    const timestampDiff = timestamps[timestamps.length - 1] - timestamps[timestamps.length - MAX_REQUESTS_LIMIT]

    if (timestampDiff <= MAX_REQUESTS_TIME_DIFF) {
      userRequestsInfo[userId].isBlockedByDDoS = true;

      timeoutedUnblock(userId);
    }

    // Чтобы не накапливать старые timestamp'ы - постепенно очищаем их
    if (timestamps.length > MAX_REQUESTS_LIMIT) {
      userRequestsInfo[userId].timestamps.shift();
    }
  }
}

/**
 * Разблокировка пользователя через время = `UNBLOCK_USER_TIME`
 */
async function timeoutedUnblock(userId) {
  if (userRequestsInfo[userId].jsTimer) {
    clearTimeout(userRequestsInfo[userId].jsTimer);
  }

  userRequestsInfo[userId].jsTimer = setTimeout(() => {
    userRequestsInfo[userId] = {};
  }, UNBLOCK_USER_TIME);
};

export { userRequestsInfo, DDoSProtectLogger };
