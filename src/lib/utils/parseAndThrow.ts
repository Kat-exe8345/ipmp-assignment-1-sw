import type { ZodType } from "zod";

export function parseAndThrow<T>(data: T, schema: ZodType<T>) {
  const parseData = schema.safeParse(data);
  if (!parseData.success) {
    const errorMessage = parseData.error.issues
      .map((issue) => `${issue.path.join(".")} : ${issue.message}`)
      .join(", ");
    throw new Error(`Validation Error: ${errorMessage}`);
  }
  return parseData.data;
}
