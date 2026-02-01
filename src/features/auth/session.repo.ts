import { db } from "@/db";
import { session } from "@/db/schema/session";
import { eq } from "drizzle-orm";

export async function createDBSession(userId: string) {
  const [newSession] = await db
    .insert(session)
    .values({
      userId: userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .returning();
  return newSession;
}

export async function getDBSession(sessionId: string) {
  const [existingSession] = await db
    .select()
    .from(session)
    .where(eq(session.id, sessionId));

  if (!existingSession) return null;
  if (existingSession.revokedAt) return null;
  if (existingSession.expiresAt < new Date()) return null;

  return existingSession;
}

export async function revokeDBSession(sessionId: string) {
  await db
    .update(session)
    .set({ revokedAt: new Date() })
    .where(eq(session.id, sessionId));
}
