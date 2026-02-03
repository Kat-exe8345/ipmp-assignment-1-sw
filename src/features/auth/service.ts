import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/server/auth/password";
import { decryptSessionJwt, encryptSessionJwt } from "@/server/auth/tokens";
import { createDBSession, revokeDBSession } from "./session.repo";
import { createDBUser } from "@/features/users/user.repo";
import type { LoginFormData, SignupFormData } from "./validators";
import { clearSessionCookie, createSessionCookie } from "@/server/auth/cookie";
import { NextResponse } from "next/server";

export async function login(formData: LoginFormData) {
  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, formData.email.toLowerCase()));
    if (!existingUser) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_CREDENTIALS",
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    // password verification
    const valid = await verifyPassword(
      formData.password,
      existingUser.hashedPwd,
    );
    if (!valid) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_CREDENTIALS",
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    // create session and store in db
    const session = await createDBSession(existingUser.id);

    // create session token and store in a cookie
    const token = await encryptSessionJwt({
      sessionId: session.id,
    });

    await createSessionCookie(token);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      {
        ok: false,
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function signup(formData: SignupFormData) {
  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, formData.email.toLowerCase()));
    if (existingUser) {
      return NextResponse.json(
        {
          ok: false,
          code: "EMAIL_TAKEN",
          message: "User with this email already exists",
        },
        { status: 409 },
      );
    }

    const hashedPwd = await hashPassword(formData.password);

    // create new user
    const credentials = {
      name: formData.name,
      email: formData.email.toLowerCase(),
      hashedPwd: hashedPwd,
    };

    const newUser = await createDBUser(credentials);

    // create session and store in db
    const session = await createDBSession(newUser.id);

    // create session token and store in a cookie
    const token = await encryptSessionJwt({
      sessionId: session.id,
    });

    await createSessionCookie(token);

    return NextResponse.json({ ok: true });
  } catch (_error) {
    return NextResponse.json(
      {
        ok: false,
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function logout() {
  const sessionToken = await clearSessionCookie();

  if (sessionToken) {
    // clean up session in db
    try {
      const payload = await decryptSessionJwt(sessionToken);
      const sessionId = payload.sessionId as string;

      // revoke session in db
      if (sessionId) {
        await revokeDBSession(sessionId);
      }
    } catch (_e) {
      // invalid token
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
