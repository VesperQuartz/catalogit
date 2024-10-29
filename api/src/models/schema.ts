import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { createSelectSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  password: varchar("password").notNull(),
  email: varchar("email").notNull().unique(),
  username: varchar("username").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const fileTable = pgTable("files", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  key: varchar("key").notNull(),
  tags: varchar("tags").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: varchar("user_id").references(() => usersTable.id),
});

export const userSchema = createSelectSchema(usersTable);
export const fileSchema = createSelectSchema(fileTable);
