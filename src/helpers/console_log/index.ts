/**
 * Текст, выводимый в консоль, который может быть раскрашен в различные цвета
 */
const consoleLog = (...args) => {
  // Логируем только при включенном dev server'е
  if (!Boolean(process.env.AVDEEV_BOT_ENABLE_LOGGER)) return;

  const colors = {
    cyan: '\x1b[36m',
    FgMagenta: '\x1b[35m'
  };

  const resetColor = '%s\x1b[0m';
  const color = colors.FgMagenta + resetColor;

  console.log(color, '[logger]', ...args);
};

export default consoleLog;
