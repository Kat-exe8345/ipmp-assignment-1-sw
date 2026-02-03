import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import type { ZodError } from "zod";

export interface ValidationErrorResponse {
  message: string;
  code: string;
  fieldErrors: Record<string, string>;
}

function errorMap(error: ZodError<unknown>): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const fieldPath = issue.path.join(".");
    const field = fieldPath || "root";
    fieldErrors[field] = issue.message;
  });

  return fieldErrors;
}

export function parseAndThrow<T>(data: T, schema: ZodType<T>) {
  const parseData = schema.safeParse(data);
  if (!parseData.success) {
    const fieldErrors = errorMap(parseData.error);
    const validationError: ValidationErrorResponse = {
      message: "Validation error",
      code: "VALIDATION_ERROR",
      fieldErrors,
    };
    return NextResponse.json(
      { ok: false, ...validationError },
      { status: 400 },
    );
  }
  return NextResponse.json({ ok: true, data: parseData.data }, { status: 200 });
}
