/**
 * На каждое сообщение от пользователя необходимо декларировать новый тип контроллера
 */
import controllerDefault from './default';

import controllerRandomCat from './random_cat';

import controllerScreenMoexDay from './screen_moex_day';

import controllerScreenSpxDay from './screen_spx_day';
import controllerScreenSpxSectorsDay from './screen_spx_sectors_day';

import controllerUpdateStockScreens from './update-stock-screens';

export {
  controllerDefault,

  controllerRandomCat,

  controllerScreenMoexDay,

  controllerScreenSpxDay,
  controllerScreenSpxSectorsDay,

  controllerUpdateStockScreens,
};