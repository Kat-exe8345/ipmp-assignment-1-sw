import { cookies } from "next/headers";

export async function createSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  // logout locally
  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return sessionToken;
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  return sessionToken;
}
