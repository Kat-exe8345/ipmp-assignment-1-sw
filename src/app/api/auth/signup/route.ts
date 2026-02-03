import { parseAndThrow } from "@lib/utils/parseAndThrow";
import { signupSchema } from "@features/auth/validators";
import { signup } from "@features/auth/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // signup service
  try {
    const formData = await request.json();

    // data parsing & validation
    const parsedResponse = parseAndThrow(formData, signupSchema);
    if (!parsedResponse.ok) {
      return parsedResponse;
    }
    const parsedBody = await parsedResponse.json();
    const result = await signup(parsedBody.data);

    return result;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", message: "Something went wrong" },
      { status: 500 },
    );
  }
}
