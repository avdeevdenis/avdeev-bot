const puppeteer = require('puppeteer');

import { errorUpdateStockScreenLogger } from '../../helpers/loggers/index';
import asyncSequenceRunner from '../../helpers/async_sequence_runner';
import consoleLog from '../../helpers/console_log';
import {
  MOEX_DAY_SCREEN_PATH,

  SPX_DAY_SCREEN_PATH,
  SPX_SECTORS_DAY_SCREEN_PATH,
} from '../../helpers/screen_helpers';
import sendResponse from '../../helpers/send_response';
import processingMessage from '../../helpers/processing_message';
import { IMessage } from '../../typings/IMessage';
import { IAvdeevBot } from '../../typings/IAvdeevBot';

/**
 * Состояние обновления скриншотов
 */
const updateState = {
  isLoading: false, // В текущий момент идет обновление
  isUpdatedSuccessfully: false // Успешный статус текущего обновления
};

/**
 * Функция непосредственного обновления скриншотов с котировками акций
 * 
 * @returns {options.isUpdatedSuccessfully} - информация обновлена успешно
 * @returns {options.isLoading} - информация обновляется на данный момент
 */
const updateStockScreens = async function (message: IMessage, AvdeevBot: IAvdeevBot) {
  if (updateState.isLoading) {
    return updateState;
  }

  const { chatId, username } = processingMessage(message);

  sendResponse({
    username,
    AvdeevBot,
    chatId,
    data: 'Starting to update the information.',
  });

  updateState.isUpdatedSuccessfully = false;
  updateState.isLoading = true;

  const result = await doScreenshotSites();
  return result;
};

/**
 * Параметры сайтов, которые необходимо распарсить и сделать скриншот
 */
const sitesConfig = [
  {
    url: 'https://www.dohod.ru/ik/analytics/stockmap/',
    capturedSelector: '#micexindexcf_shares',
    screenPath: MOEX_DAY_SCREEN_PATH,
  },
  {
    url: 'https://www.sectorspdr.com/sectorspdr/tools/sector-tracker',
    capturedSelector: '#sectorTracker471',
    screenPath: SPX_SECTORS_DAY_SCREEN_PATH,
    waitForHiddenSelector: '.zone-left-one .idc-loading-wrapper'
  },
  {
    url: 'https://www.finanz.ru/indeksi/market-meykerov/s&p_500',
    capturedSelector: '.main .main:first-child',
    screenPath: SPX_DAY_SCREEN_PATH,
  }
];

/**
 * Открывает сайт и делает скриншот выбранного элемента
 */
async function openSiteAndTakeScreen(siteUrl: string, options, browser) {
  const { capturedSelector, screenPath, waitForHiddenSelector } = options;

  try {
    consoleLog('Start site `' + siteUrl + '`');
    const page = await browser.newPage();

    await page.setViewport({
      width: 1024,
      height: 800,
      deviceScaleFactor: 2,
    });

    await page.goto(siteUrl);

    if (waitForHiddenSelector) {
      await page.waitForSelector(waitForHiddenSelector, {
        hidden: true
      });
    }

    const chartElement = await page.$(capturedSelector);

    if (!chartElement) {
      errorUpdateStockScreenLogger(new Error('Selector with path `' + capturedSelector + '` not found'), {
        siteUrl,
      });

      return false;
    }

    await chartElement.screenshot({ path: screenPath });

  } catch (error) {
    errorUpdateStockScreenLogger(error, {
      siteUrl,
    });

    return false;
  }

  consoleLog('Success site `' + siteUrl + '`');
  return true;
};


/**
 * Функция делает скриншоты на выбранных сайтах
 */
async function doScreenshotSites() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'] // without that argument can not launch
  });

  const fnSequence = sitesConfig.map(({ url, ...options }) => openSiteAndTakeScreen.bind(this, url, options, browser));
  const result = await asyncSequenceRunner(fnSequence);

  /**
   * Если все результаты закончились успешно - считаем обновление успешным
   * item.resolveSuccess - успешно завершился запрос, item.response - успешно выполнилось заданное условие
   */
  const isUpdatedSuccessfully = result.every(item => item.resolveSuccess && item.response);

  updateState.isUpdatedSuccessfully = isUpdatedSuccessfully;
  updateState.isLoading = false;

  await browser.close();

  return updateState;
};

export default updateStockScreens;
