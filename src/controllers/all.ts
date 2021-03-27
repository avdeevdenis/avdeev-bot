/**
 * На каждое сообщение от пользователя необходимо декларировать новый тип контроллера
 */
import controllerDefault from './default';

import controllerDDoSBlocked from './ddos_blocked';

import controllerHolidaysToday from './holidays_today';

import controllerRandomCat from './random_cat';
import controllerRandomJoke from './random_joke';
import controllerRandomMovie from './random_movie';

import controllerScreenMoexDay from './screen_moex_day';

import controllerScreenSpxDay from './screen_spx_day';
import controllerScreenSpxSectorsDay from './screen_spx_sectors_day';

import controllerUpdateStockScreens from './update_stock_screens';

export {
  controllerDDoSBlocked,
  controllerHolidaysToday,

  controllerDefault,

  controllerRandomCat,
  controllerRandomJoke,
  controllerRandomMovie,

  controllerScreenMoexDay,

  controllerScreenSpxDay,
  controllerScreenSpxSectorsDay,

  controllerUpdateStockScreens,
};
