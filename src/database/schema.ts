import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// User table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').notNull(),
});

// Task table
export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  completed: integer('completed').notNull().default(0),
  userId: integer('user_id').notNull(),
  createdAt: text('created_at').notNull(),
});

// Context table (for context protection)
export const contexts = sqliteTable('contexts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
});
