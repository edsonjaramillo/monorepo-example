type PossibleData = Record<string, unknown> | Array<Record<string, unknown>>;
type Data<T = PossibleData> = T;

export type SuccessResponse<T> = { status: 'success'; data: Data<T>; message: string };
export type ErrorResponse = { status: 'error'; data: undefined; message: string };
export type InfoResponse<T> = { status: 'info'; data: Data<T>; message: string };
export type WarningResponse = { status: 'warning'; data: undefined; message: string };

type JSendResponse<T = PossibleData> =
  | SuccessResponse<T>
  | ErrorResponse
  | InfoResponse<T>
  | WarningResponse;

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
}
