import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string({message: 'Title is required.'}).trim().min(1, {message: 'Title is required.'}).max(255),
    description: z.string({message: 'Description is requied.'}).trim().min(1, {message: 'Description is requied.'}),
});