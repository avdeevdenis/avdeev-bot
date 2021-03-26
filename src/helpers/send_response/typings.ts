export interface ISendResponseOptions {
  type?: 'message' | 'photo' | 'animation';
  chatId: string;
  username: string;
  AvdeevBot: any;
  data: string;
  options?: {
    caption: string
  };
}
