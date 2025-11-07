import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const vertexSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const curveDataSchema = z.object({
  type: z.enum(['angle', 'radius', 'sagitta']).default('angle'),
  value: z.number(),
});

export const segmentSchema = z.object({
  v0: z.number(),
  v1: z.number(),
  color: z.string().optional(),
  curve: z.number().optional(),
  curveData: curveDataSchema.optional(),
});

export const backgroundImageSchema = z.object({
  dataURL: z.string(),
  opacity: z.number().min(0).max(1).default(0.5),
  scale: z.number().min(0.1).max(5).default(1),
  offsetX: z.number().default(0),
  offsetY: z.number().default(0),
  fitMode: z.enum(['fit', 'cover', 'center']).default('center'),
  locked: z.boolean().default(false),
});

export const mapSchema = z.object({
  id: z.string(),
  name: z.string(),
  width: z.number().min(1),
  height: z.number().min(1),
  bg: z.object({
    color: z.string(),
    image: backgroundImageSchema.optional(),
  }),
  vertexes: z.array(vertexSchema),
  segments: z.array(segmentSchema),
  discs: z.array(z.any()).optional().default([]),
  goals: z.array(z.any()).optional().default([]),
  planes: z.array(z.any()).optional().default([]),
  joints: z.array(z.any()).optional().default([]),
  traits: z.record(z.any()).optional().default({}),
  canBeStored: z.boolean().optional().default(true),
});

export const insertMapSchema = mapSchema.omit({ id: true });

export type Vertex = z.infer<typeof vertexSchema>;
export type CurveData = z.infer<typeof curveDataSchema>;
export type Segment = z.infer<typeof segmentSchema>;
export type BackgroundImage = z.infer<typeof backgroundImageSchema>;
export type HaxMap = z.infer<typeof mapSchema>;
export type InsertMap = z.infer<typeof insertMapSchema>;
