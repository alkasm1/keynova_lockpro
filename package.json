import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const keynovaKeys = pgTable("keynova_keys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  imageId: text("image_id").notNull(),
  passwordHash: text("password_hash").notNull(),
  keyHash: text("key_hash").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const protectedItems = pgTable("protected_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  itemType: text("item_type").notNull(), // 'images', 'documents', 'apps', 'custom'
  itemName: text("item_name").notNull(),
  itemPath: text("item_path"),
  isProtected: boolean("is_protected").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  isUnlocked: boolean("is_unlocked").default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertKeynovaKeySchema = createInsertSchema(keynovaKeys).omit({
  id: true,
  createdAt: true,
});

export const insertProtectedItemSchema = createInsertSchema(protectedItems).omit({
  id: true,
  createdAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export type InsertKeynovaKey = z.infer<typeof insertKeynovaKeySchema>;
export type KeynovaKey = typeof keynovaKeys.$inferSelect;

export type InsertProtectedItem = z.infer<typeof insertProtectedItemSchema>;
export type ProtectedItem = typeof protectedItems.$inferSelect;

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
