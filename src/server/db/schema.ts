import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";

export const roomTable = pgTable("room", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  prompt: text("prompt").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type room = typeof roomTable.$inferSelect;
export type roomInsert = typeof roomTable.$inferInsert;
