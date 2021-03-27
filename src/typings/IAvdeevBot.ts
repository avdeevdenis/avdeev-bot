import { ISendResponseOptionsParams } from '../helpers/send_response/typings';
import { IMessage } from './IMessage';

type ICallbackParam = IMessage | Error;

export interface IAvdeevBot {
  sendMessage: (chatId: number, message: string, options: ISendResponseOptionsParams) => void;
  sendPhoto: (chatId: number, message: string, options: ISendResponseOptionsParams) => void;
  sendAnimation: (chatId: number, message: string) => void;

  on: (method: string, onMethod: (ICallbackParam) => void) => void;
}
