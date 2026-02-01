import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  hashedPwd: text().notNull(),
});
