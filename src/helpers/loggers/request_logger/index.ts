/**
 * Компонент логирует информацию входящего сообщения и пишет в папку 'src/logs'
 */
import errorLogger from '../error_logger';
import processingMessage from '../../processing_message';
import consoleLog from '../../console_log';
import { IMessage } from '../../../typings/IMessage';

const fs = require('fs');
const path = require('path');

const root = path.dirname(require.main.filename);

/**
 * Место, куда пишутся входящие логи
 */
const logsFilePath = root + '/logs/message_logs';

const requestLogger = async (message: IMessage) => {
  const { username, text } = processingMessage(message);
  const wrappedMessage = {
    ts: Number(new Date()),
    data: message
  };

  consoleLog('Got request from `' + username + '` with message `' + text + '`');

  let stringifyMessage = '';

  try {
    stringifyMessage = JSON.stringify(wrappedMessage);
  } catch (error) {
    stringifyMessage = 'Logger was crushed...';
    await errorLogger(error, message);
  }

  const separator = '\n';
  const messageString = separator + stringifyMessage;

  await fs.appendFileSync(logsFilePath, messageString);
};

export default requestLogger;
