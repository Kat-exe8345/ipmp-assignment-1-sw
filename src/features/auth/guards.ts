import { getSession } from "@features/auth/service";

export async function requireAuthSession() {
  const session = await getSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
