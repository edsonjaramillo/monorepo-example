type Data = Record<string, unknown> | Record<string, unknown>[];

export type SuccessResponse = { status: 'success'; data: Data; message: string };
export type ErrorResponse = { status: 'error'; data: undefined; message: string };
export type InfoResponse = { status: 'info'; data: Data; message: string };
export type WarningResponse = { status: 'warning'; data: undefined; message: string };

type JSendResponse = SuccessResponse | ErrorResponse | InfoResponse | WarningResponse;

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
