import { z } from "zod";

import { HttpErrorByCode } from "../http/HttpErrorByCode";

export const validateAndParse = <TSchema extends z.ZodType>(
  schema: TSchema,
  value: unknown,
): z.infer<TSchema> => {
  const parsedValue = schema.safeParse(value);

  if (!parsedValue.success) {
    const errorDetails = z.prettifyError(parsedValue.error);

    throw new HttpErrorByCode("bad_request", errorDetails);
  }

  return parsedValue.data;
};
