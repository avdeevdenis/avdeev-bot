/**
 * Отправляет запрос на указанный url и возвращает результат
 */
const axios = require('axios');

const sendRequest = async (url) => {
  const response = await axios.get(url)
    .then(response => ({
      success: true,
      data: response
    }))
    .catch(error => ({
      error: true,
      errorObject: error
    }));

  return response;
};

export default sendRequest;
