/**
 * Компонент логирует ошибки во время выполнения автоматизированных скриптов и пишет в папку 'src/logs'
 */

import consoleLog from '../../console_log';

import { IMessage } from '../../../typings/IMessage';

const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

/**
 * Место, куда пишутся входящие логи
 */
const logsFilePath = root + '/logs/errors_logs';

const errorLogger = async (error: Error, message?: IMessage) => {
  const errorData = {
    ts: Number(new Date()),
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    message,
  };

  consoleLog('ErrorLogger GOT', errorData);

  let stringifyErrorData = '';

  try {
    stringifyErrorData = JSON.stringify(errorData);
  } catch (error) {
    stringifyErrorData = 'Logger was crushed...';
    await errorLogger(error, message);
  }

  const separator = '\n';
  const errorString = separator + stringifyErrorData;

  await fs.appendFileSync(logsFilePath, errorString);
};

export default errorLogger;
