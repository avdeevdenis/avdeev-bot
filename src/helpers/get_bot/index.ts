const TelegramBot = require('node-telegram-bot-api');

import { IAvdeevBot } from '../../typings/IAvdeevBot';
import consoleLog from '../console_log';

consoleLog('Started AvdeevBot');

const token = process.env.AVDEEV_BOT_TELEGRAM_API_TOKEN;
const AvdeevBot: IAvdeevBot = new TelegramBot(token, {
  polling: true
});

export default AvdeevBot;
