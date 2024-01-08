import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
    id: serial("id"),
    title: text("title"),
    description: text("description"),
    content: text("content"),
    footer: text("footer"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});
