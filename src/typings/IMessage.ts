/**
 * Входящее сообщение от пользователя
 */
export interface IMessage {
  /**
   * Текст сообщения
   */
  text?: string;

  /**
   * Информация о чате с пользователем
   */
  chat: IMessageChat;

  /**
   * Информация о отправителе
   */
  from: IMessageFrom;

  /**
   * Timestamp времени прихода сообщения
   */
  date: number;
}

interface IMessageChat {
  /**
   * Идентификатор чата
   */
  id: number;
}

interface IMessageFrom {
  /**
   * Логин пользователя
   */
  username: string;

  /**
   * Идентификатор пользователя
   */
  id: number;
}
