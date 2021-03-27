/**
 * Проверяет наличие файла по указанному пути
 */
const fs = require('fs');

const checkFileExists = async (path: string) => {
  return fs.promises.access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
};

export default checkFileExists;
