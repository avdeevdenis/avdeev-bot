/**
 * Экспейпим содержимое, которое не пропускает API
 */
const escapeString = string => {
  const escapedSymbols = [
    '.', '-', '=', '#', '(', ')', '!', '{', '}',
    '>', '<', '|', '+', '_'
  ];

  const escapedSequence = escapedSymbols.map(symbol => `[${symbol}]`).join('|');

  const regexp = new RegExp(escapedSequence, 'g');

  const replacer = found => '\\' + found;

  return string.replace(regexp, replacer);
};

export { escapeString };
