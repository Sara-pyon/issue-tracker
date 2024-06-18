import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string({ message: "Title is required." })
    .trim()
    .min(1, { message: "Title is required." })
    .max(255),
  description: z
    .string({ message: "Description is requied." })
    .trim()
    .min(1, { message: "Description is requied." })
    .max(65535),
});

export const patchIssueSchema = z.object({
  title: z
    .string({ message: "Title is required." })
    .trim()
    .min(1, { message: "Title is required." })
    .max(255)
    .optional(),
  description: z
    .string({ message: "Description is requied." })
    .trim()
    .min(1, { message: "Description is requied." })
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, { message: "AssignedUser is required" })
    .max(255)
    .optional()
    .nullable(),
  status: z.nativeEnum(Status, { message: "Invalid status"}).optional()
});
