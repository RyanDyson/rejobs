import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  integer,
  json,
} from "drizzle-orm/pg-core";

export const tagsEnum = pgEnum("tags", [
  "Full-time",
  "Part-time",
  "Internship",
  "Placement",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "submitted",
  "in-review",
  "interviewing",
  "offer-made",
  "rejected",
  "third-party",
]);

export const roleEnum = pgEnum("role", ["user", "assistant"]);

export const roomTable = pgTable("room", {
  id: integer("id").generatedByDefaultAsIdentity().notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  originalJSON: json("original_json").notNull(),
  prompt: text("prompt").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  jobId: integer("job_id").references(() => jobTable.id),
}).enableRLS();

export const roomSessionTable = pgTable("room_session", {
  id: integer("id").generatedByDefaultAsIdentity().notNull().primaryKey(),
  roomId: integer("room_id")
    .notNull()
    .references(() => roomTable.id),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  startedAt: timestamp("started_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const roomMessageTable = pgTable("room_message", {
  id: integer("id").generatedByDefaultAsIdentity().notNull().primaryKey(),
  roomId: integer("room_id")
    .notNull()
    .references(() => roomTable.id),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  content: text("content").notNull(),
  role: roleEnum("role").notNull().default("user"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const userTable = pgTable("user", {
  id: integer("id").generatedByDefaultAsIdentity().notNull().primaryKey(),
  clerkId: text("clerk_id").notNull(),
  email: text("email").notNull(),
  username: text("username"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
}).enableRLS();

export const jobTable = pgTable("job", {
  id: integer("id").generatedByDefaultAsIdentity().notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  companyDescription: text("company_description").notNull(),
  location: text("location").notNull(),
  salary: text("salary").notNull(),
  requirements: text("requirements").notNull(),
  responsibilities: text("responsibilities").notNull(),
  closingDate: timestamp("closing_date", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  tags: tagsEnum("tags").notNull(),
}).enableRLS();

export const applicationsTable = pgTable("applications", {
  id: integer("id").generatedByDefaultAsIdentity().notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobTable.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
}).enableRLS();

export type room = typeof roomTable.$inferSelect;
export type roomInsert = typeof roomTable.$inferInsert;
export type user = typeof userTable.$inferSelect;
export type userInsert = typeof userTable.$inferInsert;
export type job = typeof jobTable.$inferSelect;
export type jobInsert = typeof jobTable.$inferInsert;
export type tags = typeof tagsEnum.enumValues;
