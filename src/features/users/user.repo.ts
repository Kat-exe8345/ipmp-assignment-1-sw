import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import type { DBuser } from "./validators";

export async function createDBUser(credentials: DBuser) {
  const [user] = await db
    .insert(usersTable)
    .values({
      name: credentials.name,
      email: credentials.email,
      hashedPwd: credentials.hashedPwd,
    })
    .returning();
  return user;
}
