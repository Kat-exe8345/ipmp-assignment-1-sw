import {
  text,
  uuid,
  integer,
  boolean,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";
import { lists } from "./lists";

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  listId: uuid("list_id")
    .notNull()
    .references(() => lists.id),
  title: text("title").notNull(),
  description: text("description"),
  position: integer("position").notNull(),
  dueDate: timestamp("due_date"),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
