import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// User table
export const debugUsers = sqliteTable("debug_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

// Task table
export const debugTasks = sqliteTable("debug_tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  completed: integer("completed").notNull().default(0),
  userId: integer("user_id").notNull(),
  createdAt: text("created_at").notNull(),
});

// Context table (for context protection)
export const debugContexts = sqliteTable("debug_contexts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
});

// Debug replace history table
export const debugReplaceHistory = sqliteTable("debug_replace_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  taskId: text("task_id").notNull(),
  originalMatch: text("original_match").notNull(),
  originalMatchType: text("original_match_type").notNull(), // 'fixed' | 'regex'
  replacedWith: text("replaced_with").notNull(),
  replacedWithType: text("replaced_with_type").notNull(), // 'fixed'
  ruleId: integer("rule_id").notNull(),
  createdAt: text("created_at").notNull(),
});

// Relations
export const debugUsersRelations = relations(debugUsers, ({ many }) => ({
  tasks: many(debugTasks),
}));

export const debugTasksRelations = relations(debugTasks, ({ one }) => ({
  user: one(debugUsers, {
    fields: [debugTasks.userId],
    references: [debugUsers.id],
  }),
}));
