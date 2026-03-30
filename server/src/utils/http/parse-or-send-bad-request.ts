import { type Response } from "express";
import { z } from "zod";

export const parseOrSendBadRequest = <TSchema extends z.ZodType>(
  schema: TSchema,
  value: unknown,
  response: Response,
  message: string,
): z.infer<TSchema> | null => {
  const parsedValue = schema.safeParse(value);

  if (!parsedValue.success) {
    const errorDetails = z.prettifyError(parsedValue.error);

    response.status(400).json({ message, error_details: errorDetails });
    return null;
  }

  return parsedValue.data;
};
