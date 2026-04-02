import { describe, expect, it } from "vitest";

import { getHttpErrorByCode, HTTP_ERRORS, type HttpErrorCodes } from "../../constants/http-errors";
import { HttpErrorByCode } from "./HttpErrorByCode";

describe("HttpErrorByCode", () => {
  it("sets status and code from HTTP_ERRORS", () => {
    const code: HttpErrorCodes = "conflict";
    const err = new HttpErrorByCode(code);
    const expected = getHttpErrorByCode(code)!;
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(HttpErrorByCode);
    expect(err.status).toBe(expected.status);
    expect(err.code).toBe(code);
    expect(err.message).toBe(expected.message);
  });

  it("overrides default message if provided", () => {
    const code: HttpErrorCodes = "forbidden";
    const customMsg = "Custom forbidden message";
    const err = new HttpErrorByCode(code, customMsg);
    expect(err.message).toBe(customMsg);
    expect(err.status).toBe(HTTP_ERRORS.forbidden.status);
    expect(err.code).toBe(code);
  });

  it("falls back to internal_server_error if code is unknown", () => {
    // @ts-expect-error purposely passing an invalid code
    const err = new HttpErrorByCode("not-a-real-code");
    const fallback = getHttpErrorByCode("internal_server_error")!;
    expect(err.status).toBe(fallback.status);
    expect(err.message).toBe(fallback.message);
    expect(err.code).toBe("not-a-real-code");
  });
});
