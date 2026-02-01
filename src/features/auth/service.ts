import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/server/auth/password";
import { decryptSessionJwt, encryptSessionJwt } from "@/server/auth/tokens";
import { createDBSession, revokeDBSession } from "./session.repo";
import { createDBUser } from "@/features/users/user.repo";
import type { LoginFormData, SignupFormData } from "./validators";
import { clearSessionCookie, createSessionCookie } from "@/server/auth/cookie";

export async function login(formData: LoginFormData) {
  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, formData.email));
  if (!existingUser) {
    throw new Error("Invalid Credentials");
  }

  // password verification
  const valid = await verifyPassword(formData.password, existingUser.hashedPwd);
  if (!valid) {
    throw new Error("Invalid Credentials");
  }

  // create session and store in db
  const session = await createDBSession(existingUser.id);

  // create session token and store in a cookie
  const token = await encryptSessionJwt({
    sessionId: session.id,
  });

  await createSessionCookie(token);

  return { ok: true };
}

export async function signup(formData: SignupFormData) {
  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, formData.email));
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPwd = await hashPassword(formData.password);

  // create new user
  const credentials = {
    name: formData.name,
    email: formData.email,
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

  return { ok: true };
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

  return { ok: true };
}
