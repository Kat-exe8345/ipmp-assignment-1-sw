import { db } from "@/db";
import { usersTable } from "@/db/schema/users";

interface DBuser {
  name: string;
  email: string;
  hashedPwd: string;
}

export async function createDBUser(Credentials: DBuser) {
  const [user] = await db
    .insert(usersTable)
    .values({
      name: Credentials.name,
      email: Credentials.email,
      hashedPwd: Credentials.hashedPwd,
    })
    .returning();
  return user;
}
