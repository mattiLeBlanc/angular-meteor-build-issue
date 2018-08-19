export interface HTTPResponse<T> {
  statusCode?: number;
  headers?: {
      [id: string]: string
  };
  content?: string;
  data?: T;
}