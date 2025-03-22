// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator, varchar, timestamp, text, boolean } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `tradewise-ai_${name}`);

export const users = createTable(
  "user",
  (d) => ({
    id: d.varchar({ length: 256 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: d.varchar({ length: 256 }).unique(),
    phone: d.varchar({ length: 20 }).unique(),
    fullName: d.varchar({ length: 256 }),
    avatarUrl: d.text(),
    provider: d.varchar({ length: 50 }), // 'google' or 'phone'
    isEmailVerified: d.boolean().default(false),
    isPhoneVerified: d.boolean().default(false),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("email_idx").on(t.email),
    index("phone_idx").on(t.phone),
  ]
);

// User preferences and settings
export const userPreferences = createTable(
  "user_preference",
  (d) => ({
    id: d.varchar({ length: 256 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: d.varchar({ length: 256 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
    riskTolerance: d.varchar({ length: 50 }), // 'low', 'medium', 'high'
    investmentGoals: d.text(), // JSON string of goals
    preferredMarkets: d.text(), // JSON array of markets
    notificationsEnabled: d.boolean().default(true),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("user_id_idx").on(t.userId),
  ]
);

// Keep the posts table if you need it
export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)]
);
