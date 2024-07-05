import type { Pagination } from '../pagination';

type PossibleData = Record<string, unknown> | Array<Record<string, unknown>> | undefined;
type Data<T = PossibleData> = T;

export type SuccessResponse<T> = { status: 'success'; data: Data<T>; message: string };
export type ErrorResponse = { status: 'error'; data: undefined; message: string };
export type InfoResponse<T> = { status: 'info'; data: Data<T>; message: string };
export type WarningResponse = { status: 'warning'; data: undefined; message: string };
export type PaginationResponse<T> = {
  status: 'success';
  data: Data<T>;
  message: string;
  pagination?: Pagination;
};

export type JSendResponse<T = PossibleData> =
  | SuccessResponse<T>
  | ErrorResponse
  | InfoResponse<T>
  | WarningResponse
  | PaginationResponse<T>;

export class JSend {
  static success(data: Data, message: string): JSendResponse {
    return { status: 'success', data, message };
  }

  static error(message: string): JSendResponse {
    return { status: 'error', data: undefined, message };
  }

  static info(data: Data, message: string): JSendResponse {
    return { status: 'info', data, message };
  }

  static warning(message: string): JSendResponse {
    return { status: 'warning', data: undefined, message };
  }

  static pagination(data: Data, pagination: Pagination, message: string): JSendResponse {
    return { status: 'success', data, pagination, message };
  }
}
