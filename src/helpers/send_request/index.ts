import { IAjaxRequestOptions } from './typings';

/**
 * Отправляет запрос на указанный url и возвращает результат
 */
const axios = require('axios');

const sendRequest = async (options: IAjaxRequestOptions) => {
  const {
    url,
    method = 'GET',
    headers
  } = options;

  const response = await axios({
    method,
    url,
    headers,
  })
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

export { sendRequest };
