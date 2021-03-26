/**
 * Функция последовательно вызывает переданные асинхронные функции и возвращает общий массив результатов
 * 
 * @param asyncFunctionArray - массив асинхронных функций, которые необходимо выполнить последовательно
 */
const asyncSequenceRunner = async function (asyncFunctionArray) {
  const results = [];

  const successAnswer = result => ({
    success: true,
    result,
  });

  const errorAnswer = result => ({
    success: false,
    result,
  });

  await asyncFunctionArray.reduce((result, asyncFunction) => {
    return result.then(() => {
      /**
       * Выполняем следующую функцию только после того, как отработала предыдущая
       */
      return asyncFunction().then(result => {
        results.push(successAnswer(result));
        return result;
      }).catch(result => {
        results.push(errorAnswer(result));
        return result;
      });
    });
  }, Promise.resolve()); // Инициализируем очередь выполнения

  return results;
};

export default asyncSequenceRunner;
