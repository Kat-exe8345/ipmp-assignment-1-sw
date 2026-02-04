import { text, uuid, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { boards } from "./boards";

export const lists = pgTable("lists", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  boardId: uuid("board_id")
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
