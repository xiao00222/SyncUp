import { z } from "zod";
export const editProfileSchema = z.object({
    displayName:z.string().min(1,'Display Name is required'),
    bio:z.string().optional()
});
export type editProfileSchema=z.infer<typeof editProfileSchema>;