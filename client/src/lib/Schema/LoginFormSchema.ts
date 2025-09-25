import {z} from 'zod'
export const LoginFormSchema=z.object({
    email:z.string().email().min(1,'Email is required'),
    password:z.string().min(6,'password is required')
})
export type LoginSchema= z.infer<typeof LoginFormSchema>