/**
 * Компонент логирует ошибки во время выполнения обновления скриншотов по индексам (controller 'update_stock_screens') и пишет в папку 'src/logs'
 *
 * @param {Error} error - возникшая ошибка
 * @param {Object} message - входящее сообщение
 */

const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);

import errorLogger from '../error_logger';
import consoleLog from '../../console_log';

/**
 * Место, куда пишутся входящие логи
 */
const logsFilePath = root + '/logs/errors_update_stocks_screens';

const errorUpdateStockScreenLogger = async (error, params = {}) => {
  const errorData = {
    ts: Number(new Date()),
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...params
    }
  };

  consoleLog('ErrorUpdateStockLogger GOT', errorData);

  let stringifyErrorData = '';

  try {
    stringifyErrorData = JSON.stringify(errorData);
  } catch (error) {
    stringifyErrorData = 'Logger was crushed...';
    await errorLogger(error);
  }

  const separator = '\n';
  const errorString = separator + stringifyErrorData;

  await fs.appendFileSync(logsFilePath, errorString);
};

export default errorUpdateStockScreenLogger;
