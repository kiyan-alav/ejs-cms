import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3),
  price: z.number().positive(),
  teacher: z.string().min(3),
});

export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  price: z.number().positive().optional(),
  teacher: z.string().min(3).optional(),
  discount: z.number().min(0).max(100).optional(),
});
