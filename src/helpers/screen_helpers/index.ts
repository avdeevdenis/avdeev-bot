const path = require('path');

const root = path.dirname(require.main.filename);
const STATIC_SCREENS_PATH = root + '/screens';

const MOEX_DAY_SCREEN_PATH = STATIC_SCREENS_PATH + '/moex_day.png';
const SPX_DAY_SCREEN_PATH = STATIC_SCREENS_PATH + '/spx_day.png';
const SPX_SECTORS_DAY_SCREEN_PATH = STATIC_SCREENS_PATH + '/spx_sectors_day.png';

export {
  STATIC_SCREENS_PATH,

  MOEX_DAY_SCREEN_PATH,

  SPX_DAY_SCREEN_PATH,
  SPX_SECTORS_DAY_SCREEN_PATH,
};
