import { logout } from "@features/auth/service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await logout();
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", message },
      { status: 500 },
    );
  }
}
