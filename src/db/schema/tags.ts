import { text, uuid, timestamp, pgTable } from "drizzle-orm/pg-core";
import { boards } from "./boards";
import { tasks } from "./tasks";

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  boardId: uuid("board_id")
    .references(() => boards.id)
    .notNull(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const taskTags = pgTable("task_tags", {
  taskId: uuid("task_id")
    .references(() => tasks.id, { onDelete: "cascade" })
    .notNull(),
  tagId: uuid("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
});
