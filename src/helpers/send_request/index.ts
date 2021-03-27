/**
 * Отправляет запрос на указанный url и возвращает результат
 */
const axios = require('axios');

interface IRequestOptions {
  url: string;
  method?: 'GET' | 'POST';
  headers?: {
    [key: string]: string
  }
}

const sendRequest = async (options: IRequestOptions) => {
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
