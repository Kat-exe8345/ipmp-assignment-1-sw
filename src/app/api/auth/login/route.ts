import { NextResponse } from "next/server";
import { parseAndThrow } from "@lib/utils/parseAndThrow";
import { loginSchema } from "@features/auth/validators";
import { login } from "@features/auth/service";

export async function POST(request: Request) {
  // login service
  try {
    const formData = await request.json();

    // data parsing & validation
    const parsedResponse = parseAndThrow(formData, loginSchema);
    if (!parsedResponse.ok) {
      return parsedResponse;
    }

    const parsedBody = await parsedResponse.json();
    const result = await login(parsedBody.data);
    return result;
  } catch (_error) {
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", message: "Something went wrong" },
      { status: 500 },
    );
  }
}
