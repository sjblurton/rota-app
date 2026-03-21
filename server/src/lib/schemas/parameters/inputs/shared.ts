export const toEpochMilliseconds = (isoUtcDateTime: string) =>
  Date.parse(isoUtcDateTime);

export const hasAtLeastOneDefinedField = (payload: object) =>
  Object.values(payload).some((value) => value !== undefined);

export const hasValidTimeRangeWhenProvided = (
  startTime: string | undefined,
  endTime: string | undefined,
) =>
  startTime === undefined ||
  endTime === undefined ||
  toEpochMilliseconds(startTime) < toEpochMilliseconds(endTime);
