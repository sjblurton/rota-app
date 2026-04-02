import { getHttpErrorByCode, type HttpErrorCodes } from "../../constants/http-errors";

export class HttpErrorByCode extends Error {
  status: number;
  code: HttpErrorCodes;

  constructor(code: HttpErrorCodes, message?: string) {
    const { status, message: defaultMessage } =
      getHttpErrorByCode(code) ?? getHttpErrorByCode("internal_server_error")!;
    super(message ?? defaultMessage);
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, HttpErrorByCode.prototype);
  }
}
