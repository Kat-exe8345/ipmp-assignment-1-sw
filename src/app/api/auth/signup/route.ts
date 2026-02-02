import { parseAndThrow } from "@lib/utils/parseAndThrow";
import { signupSchema } from "@features/auth/validators";
import { signup } from "@features/auth/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // signup service
  try {
    const formData = await request.json();

    // data parsing & validation
    const parsedData = parseAndThrow(formData, signupSchema);

    const result = await signup(parsedData);
    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { ok: false, code: "VALIDATION_ERROR", message: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", message: "Something went wrong" },
      { status: 500 },
    );
  }
}
