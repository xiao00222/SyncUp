import { z } from 'zod';

export const activitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.date(),
  location:z.object(
    {
      venue:z.string().min(1,'venue'),
      city:z.string().optional(), 
      lattitude:z.coerce.number(),
      longitude:z.coerce.number()

    }
  )
});

export type ActivitySchema = z.infer<typeof activitySchema>;