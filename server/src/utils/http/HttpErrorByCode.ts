import { getHttpErrorByCode, type HttpErrorCodes } from "../../constants/http-errors";

export class HttpErrorByCode extends Error {
  status: number;
  code: HttpErrorCodes;
  detail: string | undefined;

  constructor(code: HttpErrorCodes, detail?: string) {
    const { status, message: defaultMessage } =
      getHttpErrorByCode(code) ?? getHttpErrorByCode("internal_server_error")!;
    super(defaultMessage);
    this.status = status;
    this.code = code;
    this.detail = detail;

    Object.setPrototypeOf(this, HttpErrorByCode.prototype);
  }
}
