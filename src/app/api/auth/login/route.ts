import { NextResponse } from "next/server";
import { parseAndThrow } from "@lib/utils/parseAndThrow";
import { loginSchema } from "@features/auth/validators";
import { login } from "@features/auth/service";

export async function POST(request: Request) {
  // login service
  try {
    const formData = await request.json();

    // data parsing & validation
    const parsedData = parseAndThrow(formData, loginSchema);

    const result = await login(parsedData);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", message: "Something went wrong" },
      { status: 500 },
    );
  }
}
