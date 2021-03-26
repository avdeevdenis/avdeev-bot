const fs = require('fs');

/**
 * Проверяет наличие файла по указанному пути
 */
const checkFileExists = async function (path) {
  return fs.promises.access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
};

export default checkFileExists;
