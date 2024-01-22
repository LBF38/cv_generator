import {
  date,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const locationTypesEnum = ["remote", "hybrid", "on-site"] as const;

export const experience = pgTable("experience", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  type: varchar("type").notNull(), // CDI, CDD, ...
  company: varchar("company").notNull(),
  location: text("location").notNull(),
  location_type: varchar("location_type", {
    enum: locationTypesEnum,
  }).notNull(), // remote, on-site, ...
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const insertExperienceSchema = createInsertSchema(experience);
export const selectExperienceSchema = createSelectSchema(experience);
