const fs = require('fs');

import { ILocaleStringOptions } from './typings';

/**
 * Возвращает дату создания файла по указанному пути
 */
async function getFileCreationDate(screenPath: string) {
  const fileStat = await fs.statSync(screenPath);

  const options: ILocaleStringOptions = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,  // important is here
    timeZone: 'Europe/Moscow', // important is here
    second: 'numeric'
  };

  const locale = 'en-EN'; // and here too
  const date = new Date(fileStat.ctime);

  return date.toLocaleString(locale, options);
};

/**
 * Возвращает строку вида 'Изображение сделано 11 марта, 00:24:30'
 */
async function getFileCreatedDateCaption(screenPath: string) {
  const createdDate = await getFileCreationDate(screenPath);

  return 'Image was created - ' + createdDate;
};

export default getFileCreatedDateCaption;
