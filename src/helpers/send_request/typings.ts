/**
 * Параметры AJAX-запроса
 */
export interface IAjaxRequestOptions {
  url: string;
  method?: 'GET' | 'POST';
  headers?: {
    [key: string]: string;
  }
}
