import { relations } from "drizzle-orm";
import * as schema from "../schema/index";

export const boardsRelations = relations(schema.boards, ({ many }) => ({
  lists: many(schema.lists),
}));

export const listsRelations = relations(schema.lists, ({ one, many }) => ({
  board: one(schema.boards, {
    fields: [schema.lists.boardId],
    references: [schema.boards.id],
  }),
  tasks: many(schema.tasks),
  tags: many(schema.tags),
}));

export const tasksRelations = relations(schema.tasks, ({ one, many }) => ({
  list: one(schema.lists, {
    fields: [schema.tasks.listId],
    references: [schema.lists.id],
  }),
  taskTags: many(schema.taskTags),
  taskComments: many(schema.taskComments),
}));

export const tagsRelations = relations(schema.tags, ({ one, many }) => ({
  board: one(schema.boards, {
    fields: [schema.tags.boardId],
    references: [schema.boards.id],
  }),
  taskTags: many(schema.taskTags),
}));

export const usersRelations = relations(schema.users, ({ many }) => ({
  boards: many(schema.boards),
  taskComments: many(schema.taskComments),
}));

export const commentsRelations = relations(schema.taskComments, ({ one }) => ({
  task: one(schema.tasks, {
    fields: [schema.taskComments.taskId],
    references: [schema.tasks.id],
  }),
  createdByUser: one(schema.users, {
    fields: [schema.taskComments.createdByUserId],
    references: [schema.users.id],
  }),
}));

export const sessionRelations = relations(schema.session, ({ one }) => ({
  user: one(schema.users, {
    fields: [schema.session.userId],
    references: [schema.users.id],
  }),
}));

export const taskTagsRelations = relations(schema.taskTags, ({ one }) => ({
  task: one(schema.tasks, {
    fields: [schema.taskTags.taskId],
    references: [schema.tasks.id],
  }),
  tag: one(schema.tags, {
    fields: [schema.taskTags.tagId],
    references: [schema.tags.id],
  }),
}));
