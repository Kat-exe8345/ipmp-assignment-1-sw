import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  hashedPwd: text().notNull(),
});
