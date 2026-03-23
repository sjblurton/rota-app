import z from "zod";

const createIdParamSchema = <TFieldName extends string>(
  fieldName: TFieldName,
  description: string,
) =>
  z.object({
    [fieldName]: z.uuid().describe(description),
  } as Record<TFieldName, z.ZodUUID>);

export const staffIdParamSchema = createIdParamSchema(
  "staff_id",
  "ID of the staff member",
);

export const shiftIdParamSchema = createIdParamSchema(
  "shift_id",
  "ID of the shift",
);

export const swapIdParamSchema = createIdParamSchema(
  "swap_id",
  "ID of the swap request",
);

export const organisationIdParamSchema = createIdParamSchema(
  "organisation_id",
  "ID of the organisation",
);
