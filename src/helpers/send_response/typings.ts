import { IAvdeevBot } from '../../typings/IAvdeevBot';

export interface ISendResponseOptions {
  /**
   * Тип ответа (message - сообщение, photo - фотография, animation - стикер)
   */
  type?: 'message' | 'photo' | 'animation';

  /**
   * Идентификатор чата
   */
  chatId: number;

  /**
   * Логин пользователя
   */
  username: string;
  /**
   * Инстанс бота
   */
  AvdeevBot: IAvdeevBot;

  /**
   * Тело ответа
   */
  data: string;

  /**
   * Вспомогательные опции
   */
  options?: ISendResponseOptionsParams;
}

export type ISendResponseOptionsParams = ISendResponsePhotoOptionsParams;

export interface ISendResponseCommonOptionsParams {
  /**
   * Режим парсинга сообщений
   */
  parse_mode?: 'MarkdownV2'
}

export interface ISendResponsePhotoOptionsParams extends ISendResponseCommonOptionsParams {
  /**
   * Заголовок к изображению
   */
  caption?: string;
}
