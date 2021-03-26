export interface IUserRequestsInfo {
  /**
   * Ключ - ID пользователя
   */
  [key: string]: {
    /**
     * Временные метки запросов пользователя
     */
    timestamps?: number[];

    /**
     * Флаг временной блокировки пользователя по DDoS
     */
    isBlockedByDDoS?: boolean;

    /**
     * Было ли отправлено разовое сообщение о блокировке
     */
    wasSendedDDoSProtectMessage?: boolean;

    /**
     * Инстанс таймера, через который происходит разблокировка пользователя
     */
    jsTimer?: null | NodeJS.Timeout;
  }
}
