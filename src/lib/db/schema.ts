import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    content: text("content"),
    footer: text("footer"),
    createdAt: timestamp("created_at").$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});


export const insertExperienceSchema = createInsertSchema(experience);
export const selectExperienceSchema = createSelectSchema(experience);
