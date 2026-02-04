import { db } from "@/db";
import { users } from "@/db/schema/users";
import type { DBuser } from "./validators";
import { eq } from "drizzle-orm";

export async function createDBUser(credentials: DBuser) {
  const [user] = await db
    .insert(users)
    .values({
      name: credentials.name,
      email: credentials.email,
      hashedPwd: credentials.hashedPwd,
    })
    .returning();
  return user;
}

export async function getDBUserById(userId: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  return user;
}

export async function getDBUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()));
  return user;
}
