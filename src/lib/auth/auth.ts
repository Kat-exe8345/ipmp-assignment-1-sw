import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "./password";
import { decryptSessionJwt, encryptSessionJwt } from "./tokens";
import { createDBSession, revokeDBSession } from "./session";
import { cookies } from "next/headers";
import { createDBUser } from "./user";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

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
    userId: existingUser.id,
  });

  const cookiesStore = await cookies();
  cookiesStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

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

  const cookiesStore = await cookies();
  cookiesStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return { ok: true };
}

export async function logout() {
  const cookiesStore = await cookies();
  const sessionToken = cookiesStore.get("session")?.value;

  // logout locally
  cookiesStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

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
