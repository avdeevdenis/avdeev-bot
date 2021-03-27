/**
 * Возможные поля информации о фильме, будут оставлены только при совпадении 'key'
 */
const avaliableKeysInfo = [
  'title',
  'genre_ids',
  'overview',
  'vote_count',
  'vote_average',
  'release_date',
  'popularity',
  'poster_path',
];

/**
 * Фильтруем входящие поля, оставляем только совпадающие с 'avaliableKeysInfo'
 */
const filterMovieData = movieData => {
  return avaliableKeysInfo.reduce((result, key) => {
    if (movieData[key]) {
      result[key] = movieData[key];
    };

    return result;
  }, {});
};

/**
 * Помечает текст жирным
 */
const markerBold = string => '*' + string + '*';

/**
 * Экспейпим содержимое, которое не пропускает API
 */
const escapeString = string => {
  const escapedSymbols = [
    '.', '-', '=', '#', '(', ')', '!', '{', '}',
    '>', '<', '|', '+'
  ];

  const escapedSequence = escapedSymbols.map(symbol => `[${symbol}]`).join('|');

  const regexp = new RegExp(escapedSequence, 'g');

  const replacer = found => '\\' + found;

  return string.replace(regexp, replacer);
};

/**
 * Некоторые символы из описания телеграм не переваривает, удаляем их
 */
const deleteDangerSymbols = string => {
  // Unhandled rejection Error: ETELEGRAM: 400 Bad Request: can't parse entities: Can't find end of Bold entity at byte offset
  // string = string.replace(/[*]/g, '')
  string = string.replace(/[_]/g, '');
  string = string.replace(/[~]/g, '');

  return string;
};

const getTitle = (movieData, year) => {
  let result = '';

  result += year ?
    markerBold(movieData.title + ', ' + year + '.') :
    markerBold(movieData.title + '.')

  result += '\n\n';

  return result;
};

const getGenres = movieData => {
  let result = '';

  const genresMapping = movieData.genre_ids.map(genreCode => {
    let genreName = '';

    switch (genreCode) {
      case 28:
        genreName = 'боевик'
        break;

      case 12:
        genreName = 'приключения'
        break;

      case 16:
        genreName = 'мультфильм'
        break;

      case 35:
        genreName = 'комедия'
        break;

      case 80:
        genreName = 'криминал'
        break;

      case 99:
        genreName = 'документальный'
        break;

      case 18:
        genreName = 'драма'
        break;

      case 10751:
        genreName = 'семейный'
        break;

      case 14:
        genreName = 'фэнтези'
        break;

      case 36:
        genreName = 'история'
        break;

      case 27:
        genreName = 'ужасы'
        break;

      case 10402:
        genreName = 'музыка'
        break;

      case 9648:
        genreName = 'детектив'
        break;

      case 10749:
        genreName = 'мелодрама'
        break;

      case 878:
        genreName = 'фантастика'
        break;

      case 10770:
        genreName = 'телевизионный'
        break;

      case 53:
        genreName = 'триллер'
        break;

      case 10752:
        genreName = 'военный'
        break;

      case 37:
        genreName = 'вестерн'
        break;

      default:
        genreName = '';
        break;
    }

    return genreName;
  }).filter(Boolean);

  if (!genresMapping.length) return result;

  result += 'Жанр - ' + genresMapping.join(', ') + '.';
  result += '\n';

  return result;
};

const getRating = movieData => {
  let result = '';

  result += 'Рейтинг - ' + markerBold(movieData.vote_average) + ' из 10.\n';

  return result;
};

const getVoteCount = movieData => {
  const voteCount = movieData.vote_count;

  let result = '';

  result += 'Оценок - ' + markerBold(voteCount) + '.';
  result += '\n';

  return result;
};

const getLink = (movieData, year) => {
  let result = '';

  const yearString = year ? year : '';

  const text = movieData.title.toLocaleLowerCase() + ' фильм ' + yearString;
  const linkToMovie = 'https://yandex.ru/search/?text=' + encodeURIComponent(text);

  result += '\n' + '[➜ Search Movie](' + linkToMovie + ')';

  return result;
};

const getDescription = movieData => {
  return '\nОписание - ' + movieData.overview + '\n';
};

const getYear = movieData => {
  return movieData.release_date?.split('-')[0];
}

/**
 * Изображение, которое отправляется пользователю
 */
const getPosterSrc = movieData => {
  // "poster_sizes": [
  //   "w92",
  //   "w154",
  //   "w185",
  //   "w342",
  //   "w500",
  //   "w780",
  //   "original"
  // ]
  return 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;
};

/**
 * Подпись к изображению фильма
 */
const getReponseCaption = rawMovieData => {
  const movieData: any = filterMovieData(rawMovieData);
  const year = getYear(movieData);

  let result = '';

  if (movieData.title) {
    result += getTitle(movieData, year);
  }

  if (movieData.genre_ids) {
    result += getGenres(movieData);
  }

  if (movieData.vote_average) {
    result += getRating(movieData);
  }

  if (movieData.vote_count) {
    result += getVoteCount(movieData);
  }

  if (movieData.overview) {
    result += getDescription(movieData);
  }

  /**
   * Эскеймип итоговое описание фильма
   */
  result = escapeString(deleteDangerSymbols(result));

  /**
   * Добавляем ссылку на поиск фильма
   */
  result += getLink(movieData, year);

  return result;
}

export {
  filterMovieData,

  getYear,
  getTitle,
  getGenres,
  getRating,
  getVoteCount,
  getDescription,
  getLink,
  getPosterSrc,
  getReponseCaption,

  escapeString,
}
